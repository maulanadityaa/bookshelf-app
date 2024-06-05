const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
    },
    genre: {
      type: [String],
      required: [true, "Genre is required"],
    },
    yearPublished: {
      type: Number,
      required: [true, "Title is required"],
      validate: {
        validator: (value) => {
          const yearRegex = /^\d{4}$/;
          return yearRegex.test(value) && value >= 0;
        },
        message: "Year must be a valid year (YYYY) and non-negative.",
      },
    },
    read: {
      type: Boolean,
      default: false,
    },
    imageUrl: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=2098&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
