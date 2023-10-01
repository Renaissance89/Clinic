const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const config = require('./config')

// routes
const routerPatient = require('./routes/patient')


const app = express()
app.use(cors('*'))

// get input from user using request.body
app.use(bodyParser.json())

//request userID
// function getUserId(request, response, next) {
//   // const token = request.headers['token']
//   // const data = jwt.verify(token, config.secret)
//   // request.userId = data['id']
  
//   if (request.url == '/user/signin'
//       ||request.url == '/user/signup'
//       ||request.url == '/contactus/create'
//       ||request.url == '/user/emailValidation') {

//     // do not check for token 
//     next()
    
//   } else {

    
//     try {
//       const token = request.headers['token']
//       const data = jwt.verify(token, config.secret)

//       // userId with logged in user's id
//       request.userId = data['id']
//       // console.log(data['id'])

//       // call routes
//       next()
      
//     } catch (ex) {
//       response.status(401)
//       response.send({status: 'error', error: 'protected api'})
//     }
//   }
// }

//console.log(data['id'])
// app.use(getUserId)

// add routes to the application
app.use('/patient', routerPatient)
// app.use('/address',routerAddress)
// app.use('/contactus',routerContactus)


app.listen(3000, '0.0.0.0', () => {
  console.log('server started on port 3000')
})