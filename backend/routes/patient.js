const express = require('express')
const db = require('../db')
const utils = require('../utils')
const router = express.Router()
const { request, response } = require('express')




router.post('/signup', (request, response) => {
  const {Name, Age, Address, Disease, Treatment, Treatment_Plan, day,
    day1, time, time1, date,session,review}  = request.body
  
    const statement = `insert into patient (Name, Age,Address , Disease, Treatment,Treatment_Plan,day,day1,time,time1,date,session,review) values(
      '${Name}', '${Age}', '${Address}', '${Disease}', '${Treatment}', '${Treatment_Plan}', '${day}', '${day1}', '${time}',
       '${time1}', '${date}','${session}', '${review}')`
  
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

   router.get('/count',(request,response)=>{
    const statement =`SELECT COUNT(Id) as count FROM patient;`
    db.query(statement,(error,dbResult)=>{
      response.send(dbResult)
    })
   })

  module.exports = router