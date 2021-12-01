const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan')
const bodyParser = require('body-parser');
require("./db/conn");

const EmployeeRoute = require('./routes/employee')
const AuthRoute = require('./routes/auth');
const bookRoute = require('./routes/book')
const authorRoute = require('./routes/author')
const userRoute = require('./routes/user')

const app = express()
const PORT  = process.env.PORT || 8000

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(authorRoute)
app.use(bookRoute)
app.use(userRoute)
app.use('/auth', AuthRoute)
// app.use('/api/employee', EmployeeRoute)


app.listen(PORT, ()=> {
    console.log("Server Running")
})



