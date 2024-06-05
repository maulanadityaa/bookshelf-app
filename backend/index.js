const express = require("express");
const mongoose = require("mongoose");
const bookRoute = require("./routes/book.route");
const connectDb = require("./config/database");

require("dotenv").config();

const app = express();
connectDb();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.status(200).json("Welcome to Bookshelf API");
});

app.use("/api/v1/books", bookRoute);
