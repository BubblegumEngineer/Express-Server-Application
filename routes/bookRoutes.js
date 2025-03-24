const express = require('express');
const router = express.Router();
const books = require('../models/books');

// GET all books
router.get('/books', (req, res) => {
    res.render('index', {
      title: 'Library Management System', // Set the title dynamically
      books: books,  // Pass the books data to the view
});
});
// GET a form to add a book
router.get('/books/new', (req, res) => {
  res.render('add-book');
});

// POST a new book
router.post('/books', (req, res) => {
  const { title, author, genre } = req.body;
  const newBook = {
    id: books.length + 1,
    title: title,
    author: author,
    genre: genre,
  };
  books.push(newBook);
  res.redirect('/books');
});

// GET a form to edit a book
router.get('/books/edit/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (book) {
    res.render('edit-book', { book: book });
  } else {
    res.status(404).send('Book not found');
  }
});

// POST update a book
router.post('/books/edit/:id', (req, res) => {
  const { title, author, genre } = req.body;
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (book) {
    book.title = title;
    book.author = author;
    book.genre = genre;
    res.redirect('/books');
  } else {
    res.status(404).send('Book not found');
  }
});

// DELETE a book
router.get('/books/delete/:id', (req, res) => {
  const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
  if (bookIndex > -1) {
    books.splice(bookIndex, 1);
    res.redirect('/books');
  } else {
    res.status(404).send('Book not found');
  }
});

module.exports = router;