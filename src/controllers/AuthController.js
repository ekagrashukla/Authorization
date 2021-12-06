const User = require('../models/User')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer");
const config = require("../../config.json");
const { registerService, loginService, refreshtokenService, forgotpasswordService, resetpasswordService, sendmailService } = require('../services/AuthServices');

const register = (req,res)       =>  bcrypt.hash(req.body.password, 10, (err,hashedPass)=> registerService(err, hashedPass,req,res)) 
const login = (req,res)          =>  loginService(req,res)
const sendmail = (req,res)       =>  sendmailService(userEmail, userName, verificationToken = null, req,res)
const refreshToken = (req,res)   =>  refreshtokenService(req,res)
const forgotpassword = (req,res) =>  forgotpasswordService(req,res)
const resetpassword = (req,res)  =>  resetpasswordService(req,res)

module.exports = {
    register,login, sendmail,refreshToken, forgotpassword, resetpassword
}
