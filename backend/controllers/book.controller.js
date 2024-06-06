const { default: mongoose } = require("mongoose");
const Book = require("../models/book.model");
const { formatBook } = require("../util/book.util");

const createBook = async (req, res) => {
  try {
    const book = new Book(req.body);

    if (req.body.imageUrl != undefined) {
      book.imageUrl = req.body.imageUrl;
    }

    await book.save();

    res.status(201).json({
      statusCode: 201,
      message: "Book added successfully",
      data: formatBook(book),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({
      statusCode: 200,
      message: "Books fetched successfully",
      data: books.map(formatBook),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const bookId = new mongoose.Types.ObjectId(req.params.id);

    const book = await Book.findById(bookId);

    if (!book)
      return res
        .status(404)
        .json({ message: `Book with id=${req.params.id} not found` });

    res.status(200).json({
      statusCode: 200,
      message: "Book fetched successfully",
      data: formatBook(book),
    });
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ message: err.message });
  }
};

const updateBookById = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!book)
      return res
        .status(404)
        .json({ message: `Book with id=${req.params.id} not found` });

    res.status(200).json({
      statusCode: 200,
      message: "Book updated successfully",
      data: formatBook(book),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const deleteBookById = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book)
      return res
        .status(404)
        .json({ message: `Book with id=${req.params.id} not found` });

    res.status(200).json({
      statusCode: 200,
      message: "Book deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBookById,
  deleteBookById,
};
