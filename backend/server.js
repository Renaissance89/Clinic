const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const config = require('./config')

// routes
const routerPatient = require('./routes/patient')
const routerAdmin = require('./routes/admin')
const routerReview = require('./routes/review')


const app = express()
app.use(cors('*'))

// get input from user using request.body
app.use(bodyParser.json())

//request userID
function getPatientId(request, response, next) {
  
  if (
       request.url == '/patient/count'
        ||request.url == "/patient/patient-data"
        || request.url.startsWith('/patient/image/')
      ) {

    // do not check for token 
   next()
    
  } else {

    
    try {
      const token = request.headers['token']
     // const data = jwt.verify(token, config.secret)
     // console.log(token)
      // userId with logged in user's id
      if(token == undefined){
        throw " undefined token"
      }

     // call routes
      next()
      
    } catch (ex) {
     // console.log(ex)
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
 app.use('/review',routerReview)
// app.use('/contactus',routerContactus)


app.listen(3000, '0.0.0.0', () => {
  console.log('server started on port 3000')
})