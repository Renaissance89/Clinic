const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const config = require('./config')

// routes
const routerPatient = require('./routes/patient')
const routerAdmin = require('./routes/admin')


const app = express()
app.use(cors('*'))

// get input from user using request.body
app.use(bodyParser.json())

//request userID
function getPatientId(request, response, next) {
  
  if (
       request.url == '/patient/count'
      ) {

    // do not check for token 
   next()
    
  } else {

    
    try {
      const token = request.headers['token']
      const data = jwt.verify(token, config.secret)

      // userId with logged in user's id
     // request.patientId = data['id']
    //  console.log(data['id'])

     // call routes
      next()
      
    } catch (ex) {
      response.status(401)
      response.send({status: 'error', error: 'protected api'})
    }
  }
}

//console.log(data['id'])
app.use(getPatientId)

// add routes to the application
app.use('/patient', routerPatient)
 app.use('/admin',routerAdmin)
// app.use('/contactus',routerContactus)


app.listen(3000, '0.0.0.0', () => {
  console.log('server started on port 3000')
})