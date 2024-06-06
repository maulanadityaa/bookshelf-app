const express = require("express");
const cors = require("cors");
const bookRoute = require("./routes/book.route");
const imageRoute = require("./routes/image.route");
const connectDb = require("./config/database");

require("dotenv").config();

const app = express();
connectDb();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.status(200).json("Welcome to Bookshelf API");
});

app.use("/api/v1/books", bookRoute);

app.use("/api/v1/upload-cover", imageRoute);
