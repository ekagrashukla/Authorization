const express = require('express');
const Book = require("../models/Book")


const insertbookService = async (req,res)=>{
    try {
        const docBook = await Book.create(req.body);
        console.log("Created Book:\n", docBook);
        res.send(docBook)
    } catch (error) {
        res.status(400).send(e) 
    }
}

const getbookService =  async (req,res)=>{
    const {bookid} = req.params;
    const book = await Book.findById(bookid)
    res.send(book);
}

const addauthortobookService = async (req,res)=>{
    try {
        const {authorId,bookId} = req.params;
        console.log(authorId,bookId)
        const docBook = await Book.findByIdAndUpdate(
            bookId,
            { $push: { authors: authorId } },
            { new: true, useFindAndModify: false }
          );
        console.log("book:", bookId);
        res.send(`Successfully added Author ID : ${authorId} to Book ID : ${bookId}`);
    } catch (error) {
        res.status(400).send(error)
    }

}

module.exports = {insertbookService, getbookService, addauthortobookService}