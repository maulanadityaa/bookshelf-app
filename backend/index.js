const express = require("express");
const mongoose = require("mongoose");
const bookRoute = require("./routes/book.route");

require("dotenv").config();

const app = express();

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

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log("Error connecting to MongoDB", err));
