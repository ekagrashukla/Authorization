const mongoose = require('mongoose');

const uri = "mongodb+srv://ekagra:shukla@helloworld.14g3m.mongodb.net/userapi?retryWrites=true&w=majority"

mongoose.connect(uri)
const db = mongoose.connection 

db.on('error',(err) => {
    console.log(err)
})
db.once('open',()=> {
    console.log("Database Connection Established")
})