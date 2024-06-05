const { storage } = require("../storage/storage");
const multer = require("multer");
const upload = multer({ storage });

const uploadImage = async (req, res) => {
  try {
    await upload.single("image")(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          message: err.message,
        });
      }
      return res.status(200).json({
        message: "Image uploaded successfully",
        imageUrl: req.file.path,
      });
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

module.exports = { uploadImage };
