const multer = require("multer");

// Keep uploaded image in RAM memory buffer
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max 5MB file size
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Chỉ chấp nhận file hình ảnh!"), false);
    }
  },
});

module.exports = upload;