const express = require('express');
const User = require("../models/User");
const { createuserService, readbookService, userinfoService } = require('../services/UserService');


const createUser = (req,res) => createuserService(req,res) 

const readbook = (req,res) => readbookService(req,res)

const userinfo = (req,res) => userinfoService(req,res)

module.exports = {createUser, readbook, userinfo}