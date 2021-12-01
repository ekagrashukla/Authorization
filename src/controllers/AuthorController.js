const express = require('express');
const Author = require("../models/Author")


const insertauthor =  async (req,res)=>{
    try {
        const docAuthor = await Author.create(req.body)
        res.send(docAuthor)
    } catch (error) {
        res.status(400).send(e)
    }
}

const getAuthor = async (req,res)=>{
    const {authorid} = req.params;
    const author = await Author.findById(authorid).populate("books");
    res.send(author);
}

const addBookToAuthor = async (req,res)=>{
    try {
        const {bookId,authorId} = req.params;
        const docAuthor = await Author.findByIdAndUpdate(
            authorId,
            { $push: { books: bookId } },
            { new: true, useFindAndModify: false }
          );
        console.log("book:", bookId);
        res.send(`Successfully added Book ID : ${bookId} to Author ID : ${authorId}`);
    } catch (error) {
        res.status(400).send(e)
    }

}

module.exports = {insertauthor, getAuthor, addBookToAuthor}