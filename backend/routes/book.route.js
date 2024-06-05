const express = require("express");
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBookById,
  deleteBookById,
} = require("../controllers/book.controller");
const { storage } = require("../storage/storage");
const multer = require("multer");
const upload = multer({ storage });

const router = express.Router();

router.get("/", upload.single("image"), getAllBooks);
router.get("/:id", getBookById);
router.post("/", createBook);
router.put("/:id", updateBookById);
router.delete("/:id", deleteBookById);

module.exports = router;
