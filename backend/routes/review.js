const express = require('express')
const db = require('../db')
const utils = require('../utils')
const fs = require('fs')

const multer = require('multer')
const { request } = require('http')
const upload = multer({dest:"E:\\rajeshKaradkar\\backend\\routes\\videos"})

const router = express.Router()

router.get('/videos/:fileName',(request,response)=>{
    const {fileName} = request.params
    // const file= fs.readFileSync(__dirname+` '\'videos`+fileName)
    const file= fs.readFileSync(__dirname+`\\videos\\`+fileName)
    response.send(file)
})

router.get('/before/:id',(request,response)=>{
    const {id} = request.params;
    const statement = `select * from patient where rBefore='${id}' or after='${id}'`
    db.query(statement, (error, data) => {
        response.send(utils.createResult(error, data))
      })
})

router.post('/after/:patientId',upload.single('after'),(request,response)=>{
    const{patientId} = request.params
    const fileName = request.file.filename
    const statement = `update patient set after = '${fileName}' where patientId='${patientId}'`
    db.query(statement, (error, data) => {
        response.send(utils.createResult(error, data))
      })
})
router.post('/rBefore/:patientId',upload.single('rBefore'),(request,response)=>{
    const{patientId} = request.params
    const fileName = request.file.filename
    const statement = `update patient set rBefore = '${fileName}' where patientId='${patientId}'`
    db.query(statement, (error, data) => {
        response.send(utils.createResult(error, data))
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

   router.post('/delete-review/:id/:name', (request, response) => {
    const { id,name} = request.params
    const statement = `update patient set ${name} = "" where patientId = ${id}`
    db.query(statement, (error, data) => {
      if(error) {
        response.send(utils.createResult(error,data))
      } else {
        response.send(utils.createResult(error,data))
      }
    })
  })
module.exports = router