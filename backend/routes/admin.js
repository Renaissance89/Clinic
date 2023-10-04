const express = require('express')
const db = require('../db')
const utils = require('../utils')
const config = require('../config')
const router = express.Router()
const jwt = require('jsonwebtoken')
const crypto = require('crypto-js')
const { request, response } = require('express')


router.post('/signin', (request, response) => {
    const {email, password} = request.body
    const statement = `select p.patientId from patient p inner join admin a on p.adminId = a.adminId where email = '${email}' and password = '${password}'`

                        
                         
    
    db.query(statement, (error, users) => {
      if (error) {
        response.send({status: 'error', error: error})
      }
       else
        {
        // if (users.length == 0) {
        //   response.send({status: 'error', error: 'admin does not exist'})
        // } else {
 
        //   if(user['isActive'] == 1){
        //     const token = jwt.sign({id: user['patientId']}, config.secret)
        //     response.send(utils.createResult(error, {
        //       patientId:user['patientId'],
        //       token: token
        //     }))      
        //   }
        //   else{
        //     response.send({status:'error',error:'user is not activated'})
        //   }
  
        // }
        const user = users[0]
        const token = jwt.sign({id: user['patientId']}, config.secret)
        response.send(utils.createResult(error, {
          patientId:user['patientId'],
          token: token
        })) 
      }
    })
  })
  

module.exports = router