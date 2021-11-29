const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan')
const bodyParser = require('body-parser');

const EmployeeRoute = require('./routes/employee')
const AuthRoute = require('./routes/auth');

mongoose.connect("")
const db = mongoose.connection 

db.on('error',(err) => {
    console.log(err)
})
db.once('open',()=> {
    console.log("Databae Connection Established")
})

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const PORT  = process.env.PORT || 8000

app.listen(PORT, ()=> {
    console.log("Server Running")
})

app.use('/api/employee', EmployeeRoute)
app.use('/api', AuthRoute)
