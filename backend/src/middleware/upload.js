const multer = require("multer");
const path   = require("path");

// Where to save images and what to name them
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // saved inside the /uploads folder
  },
  filename: (req, file, cb) => {
    // e.g. 1720000000000-wallet.jpg — timestamp + original name to avoid collisions
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Only allow image files
const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/webp"];
  allowed.includes(file.mimetype)
    ? cb(null, true)
    : cb(new Error("Only JPEG, PNG, and WEBP images are allowed."), false);
};

module.exports = multer({ storage, fileFilter });