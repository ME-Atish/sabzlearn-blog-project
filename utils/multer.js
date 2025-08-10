const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "../public/image/covers"));
  },
  filename: (req, file, cb) => {
    const filename =
      `${file.originalname}-${Date.now()}` + path.extname(file.originalname);
    cb(null, filename);
  },
});

const uploader = multer({
  storage,
  limits: { fileSize: 3 * 1024 * 1024 }, // 3MB
});

module.exports = uploader;
