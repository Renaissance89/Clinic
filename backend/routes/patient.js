const express = require('express')
const db = require('../db')
const utils = require('../utils')
const config = require('../config')
const jwt = require('jsonwebtoken')
const { request, response } = require('express')
const multer = require('multer')
const fs = require('fs')

const upload = multer({dest:"E:\\rajeshKaradkar\\backend\\routes\\images"})

const router = express.Router()

router.get('/image/:fileName',(request,response)=>{
  const {fileName} = request.params
  // const file= fs.readFileSync(__dirname+` '\'videos`+fileName)
  const file= fs.readFileSync(__dirname+`\\images\\`+fileName)
  response.send(file)
})

router.post('/image/:patientId',upload.single('image'),(request,response)=>{
  const{patientId} = request.params
  const fileName = request.file.filename
  const statement = `update patient set image = '${fileName}' where patientId='${patientId}'`
  db.query(statement, (error, data) => {
      response.send(utils.createResult(error, data))
    })
})


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


   router.get('/count',(request,response)=>{
    const statement =`SELECT COUNT(patientId) as count FROM patient;`
    db.query(statement,(error,patient)=>{
      const p =patient[0]
      const token=jwt.sign({patientId:p['patientId']},config.secret)
      response.send(utils.createResult(error, {
        count:p['count'],
        token: token
      }))
    })
   })

   router.delete('/delete/:id',(request,response)=>{
    const { id} = request.params
    const statement =`DELETE FROM patient where patientId=${id};`
    db.query(statement, (error, dbResult) => {
      response.send(utils.createResult(error, dbResult))
      console.log(dbResult)
    })
   })

   router.put('/update-patient/:id', (request, response) => {
    const { id } = request.params
    const {Name, Age, Address, Disease, Treatment, Treatment_Plan, day,
      day1, time, time1, date,session,review,History,Points,Phone}  = request.body

    const statement = `update patient  set Name= '${Name}', Age='${Age}', Address ='${Address}', Disease='${Disease}',
       Treatment='${Treatment}',Treatment_Plan='${Treatment_Plan}',day='${day}',day1='${day1}',time='${time}',time1= '${time1}',
          date='${date}',session='${session}',review='${review}',History='${History}',Points='${Points}',Phone='${Phone}'
        WHERE patientId=${id}`
    db.query(statement, (error, data) => {
      if(error) {
        response.send(utils.createResult(error,data))
      } else {
        response.send(utils.createResult(error,data))
      }
    })
  })

  router.get('/Treatment', ( request,response) => {
    // const userId = request.body.userId
    const statement = ` select * from treatment `
     // const statement = ` select   a.addressId, a.state, a.district, a.address, u.firstName from users u INNER JOIN address a
     //         on a.id = u.id  where a.id = ${request.userId} `
     db.query(statement, (error, dbResult) => {
       response.send(utils.createResult(error, dbResult))
     })
   })


  module.exports = router