const express = require('express');
const User = require("../models/User")


const createUser = async(req,res) => {
    try {
        const docUser =  await User.create(req.body);
        res.send(docUser)
    } catch (error) {
      res.status(400).send(error)
    }
}  

const readbook = async (req,res) => {
    try {
        const {username,bookId} = req.params;
        const user = await User.findOneAndUpdate(
        username,
        { $push: { booksRead: bookId } },
        { new: true, useFindAndModify: false })
        res.send(`Ok ${username}. You have read book id ${bookId}`)
    } catch (error) {
        res.send(error)
    }
    
  }

const userinfo = async(req,res) => {
    const {userinfo} = req.params
    const userInfo = await User.find(userinfo)
    console.log(userInfo)
    res.send(userInfo)
  }

module.exports = {createUser, readbook, userinfo}