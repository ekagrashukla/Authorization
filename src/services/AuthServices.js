const User = require('../models/User')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer");
const config = require("../../config.json")

function registerService(err, hashedPass, req, res){
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
}

const loginService = (req,res) => {
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

const refreshtokenService = (req,res) => {
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

const sendmailService = async (userEmail, userName, verificationToken = null,req,res,) => {
    console.log("test")
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: config.EMAIL,
        pass: config.PASS, 
      },
      tls:{
          rejectUnauthorized:false
      }
    });
        var info = await transporter.sendMail({
            from: `"Forgot Password? 👻" ${config.EMAIL}>`, 
            to: userEmail,
            subject: `Hello ${userName}` ,
            text: `Hi ${userName}! Here's the link to reset your password ==> http://localhost:8000/auth/resetpassword/${verificationToken}`
          //   html: "<b>Hello world?</b>",
          });
  
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }

const forgotpasswordService = (req,res) => {
    const username = req.body.username 
    const email = req.body.email
    let resettoken = jwt.sign({username:username}, 'verysecretvalue', {expiresIn: '10m'})
    sendmailService(email, username,resettoken)
    res.send("done")
}

const resetpasswordService = async (req,res) => {
    const newpassword = req.body.newpassword
    const uname = (jwt.verify(req.params.tkn.toString(),"verysecretvalue"))
    try {
        console.log(newpassword)
        console.log(uname)
        const data = await User.findOne({username:uname.username})
        console.log(data)
        bcrypt.hash(newpassword, 10, async (err, hashedPass) => {
            if(err){
                res.json({
                    error:err
                })
            }
                console.log(hashedPass)
                data.password = hashedPass
                
                await data.save()
                res.send("Password changed successfully")
            })
    } catch (error) {
        res.send(error)
    }
}

module.exports = {registerService, loginService, refreshtokenService, sendmailService, forgotpasswordService, resetpasswordService}