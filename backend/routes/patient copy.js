const express = require('express')
const db = require('../db')
const utils = require('../utils')
const config = require('../config')
const jwt = require('jsonwebtoken')
const router = express.Router()
const { request, response } = require('express')

// const upload = multer({dest:"E:\\rajeshKaradkar\\backend\\routes\\videos"})




router.post('/signup', (request, response) => {
  const {Name, Age, Address, Disease, Treatment, Treatment_Plan, day,
    day1, time, time1, date,session,review,History,Points,Phone}  = request.body
  
    const statement = `insert into patient (Name, Age,Address , Disease, Treatment,Treatment_Plan,day,day1,time,time1,date,session,review,History,Points,Phone) values(
      '${Name}', '${Age}', '${Address}', '${Disease}', '${Treatment}', '${Treatment_Plan}', '${day}', '${day1}', '${time}',
       '${time1}', '${date}','${session}', '${review}', '${History}', '${Points}', '${Phone}')`
  
    db.query(statement, (error, dbResult) => {
      // const result = utils.createResult(error, dbResult)
      // response.send(result)
      response.send(utils.createResult(error, dbResult))
    })
  
  })

  router.post('/signup1', (request, response) => {
    const {Name, Age}  = request.body
    
      const statement = `insert into patient (Name, Age) values(
        '${Name}', '${Age}')`
    
      db.query(statement, (error, dbResult) => {
        // const result = utils.createResult(error, dbResult)
        // response.send(result)
        response.send(utils.createResult(error, dbResult))
      })
    
    })

  router.get('/patientData', ( request,response) => {
    // const userId = request.body.userId
    const statement = ` select * from patient `
     // const statement = ` select   a.addressId, a.state, a.district, a.address, u.firstName from users u INNER JOIN address a
     //         on a.id = u.id  where a.id = ${request.userId} `
     db.query(statement, (error, dbResult) => {
       response.send(utils.createResult(error, dbResult))
     })
   })

   router.get('/name', ( request,response) => {
    // const userId = request.body.userId
    const Name=request.body.Name
    console.log(this.Name)
    const statement = ` select * from patient where Name='${Name}' `

    console.log(statement)
     // const statement = ` select   a.addressId, a.state, a.district, a.address, u.firstName from users u INNER JOIN address a
     //         on a.id = u.id  where a.id = ${request.userId} `
     db.query(statement, (error, dbResult) => {
       response.send(utils.createResult(error, dbResult))
       console.log(dbResult)
     })
   })

   router.get('/:id', ( request,response) => {
    // const userId = request.body.userId
    const {id} = request.params;
    const statement = ` select * from patient where patientId='${id}' `
     // const statement = ` select   a.addressId, a.state, a.district, a.address, u.firstName from users u INNER JOIN address a
     //         on a.id = u.id  where a.id = ${request.userId} `
     db.query(statement, (error, dbResult) => {
       response.send(utils.createResult(error, dbResult))
     })
   })

   router.get('/count',(request,response)=>{
    // const statement =`SELECT COUNT(patientId) as count FROM patient;`
    const statement = ` select * from patient `
    console.log(statement)
    db.query(statement, (error, dbResult) => {
      response.send(utils.createResult(error, dbResult))
    })
   })

   router.post('/signin', (request, response) => {
    const {email, password} = request.body
    const statement = `select userId, firstName, lastName, role, active from user where email = '${email}' 
                      and password = '${crypto.SHA256(password)}' and active = 1`
  
    db.query(statement, (error, users) => {
      if (error) {
        response.send({status: 'error', error: error})
      } else if (users.length == 0) {
        response.send({status: 'error', error: 'User does not exist'})
      } else {
        const user = users[0]
        if (user['active'] == 1) {
          // user is an active user
          const token = jwt.sign({id: user['userId']}, config.secret)
          response.send(utils.createResult(error, {
            firstName: user['firstName'],
            lastName: user['lastName'],
            token: token,
            role: user['role']
          }))
        } else {
          // user is a suspended user
          response.send({status: 'error', error: 'Your account is not active. Please contact administrator'})
        }
      }
    })
  })

  module.exports = router