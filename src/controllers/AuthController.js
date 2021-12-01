const User = require('../models/User')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const register = (req,res,next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass){
        if(err){
            res.json({
                error:err
            })
        }
        let user = new User ({
            username: req.body.username,
            password: hashedPass
        })
    
        user.save()
        .then(user => {
            res.json({
                message: "User Added Successfully"
            })
        })
        .catch(error => {
            res.json({
                message: 'An error occured'
            })
        })
    }) 

}

const login = (req,res,next) => {
    var username = req.body.username
    var password = req.body.password
    User.findOne({username:username})
    .then(user => {
        if(user){
            bcrypt.compare(password,user.password, function(err,result){
                if(err) {
                    res.json({
                        error:err
                    })
                }
                if(result){
                    let token = jwt.sign({name:user.name}, 'verysecretvalue', {expiresIn: '10d'})
                    let refreshtoken = jwt.sign({name:user.name}, 'refreshtokensecretvalue', {expiresIn: '48h'})
                    res.json({
                        message: 'Login Successful',
                        token:token,
                        refreshtoken:refreshtoken
                    })
                }else{
                    res.json({
                        message: 'Password does not match'
                    })
                }
            })
        }else{
            res.json({
                message: "No user found"
            })
        }
    })
}

const refreshToken = (req,res,next) => {
    const refreshToken = req.body.refreshToken
    jwt.verify(refreshToken,"refreshtokensecretvalue", function(err,decode){
        if(err) {
            res.status(400).json({
                err
            })

        }
        else{
            let token = jwt.sign({name:decode.name},"verysecretvalue", {expiresIn:'30s'})
            let refreshToken = req.body.refreshToken
            res.status(200).json({
                message: "Token Refreshed Successfully",
                token,
                refreshToken
            })
        } 

    })
}


module.exports = {
    register,login,refreshToken
}
