const express = require("express");
const { uploadImage } = require("../controllers/image.controller");
const router = express.Router();

router.post("/", uploadImage);

module.exports = router;
