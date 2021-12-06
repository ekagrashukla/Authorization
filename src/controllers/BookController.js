const express = require('express');
const Book = require("../models/Book");
const { insertbookService, getbookService, addauthortobookService } = require('../services/BookService');


const insertbook = (req,res) => insertbookService(req,res)
const getBook =  (req,res) => getbookService(req,res)
const addAuthorToBook = (req,res) => addauthortobookService(req,res)

module.exports = {insertbook, getBook, addAuthorToBook}