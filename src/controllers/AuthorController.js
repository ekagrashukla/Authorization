const express = require('express');
const Author = require("../models/Author");
const { insertauthorService, addbooktoauthorService, getauthorService } = require('../services/AuthorService');


const insertauthor =  (req,res) => insertauthorService(req,res)
const getAuthor = (req,res) => getauthorService(req,res)
const addBookToAuthor = (req,res) => addbooktoauthorService(req,res)

module.exports = {insertauthor, getAuthor, addBookToAuthor}