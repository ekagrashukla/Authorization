const express = require('express');
const morgan = require('morgan')
const bodyParser = require('body-parser');
const index = require("./index")

const app = express()
const PORT  = process.env.PORT || 8000

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(index.authorRoute)
app.use(index.bookRoute)
app.use(index.userRoute)
app.use('/auth', index.AuthRoute)
// app.use('/api/employee', EmployeeRoute)


app.listen(PORT, ()=> {
    console.log("Server Running")
})



