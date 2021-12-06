require("./db/conn");
const EmployeeRoute = require('./routes/employee')
const AuthRoute = require('./routes/auth');
const bookRoute = require('./routes/book')
const authorRoute = require('./routes/author')
const userRoute = require('./routes/user')

module.exports = {EmployeeRoute,authorRoute,bookRoute, AuthRoute, userRoute}



