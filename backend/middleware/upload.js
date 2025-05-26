const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Ensure upload directory exists
const uploadPath = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Multer storage (memory for sharp to process)
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG/PNG/WebP are allowed.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

const resizeImage = async (req, res, next) => {
  if (!req.file) return next();

  const filename = `article-${Date.now()}.jpeg`;

  try {
    await sharp(req.file.buffer)
      .resize(800, 450)
      .toFormat('jpeg')
      .jpeg({ quality: 80 })
      .toFile(path.join(uploadPath, filename));

    req.file.filename = filename;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = upload.single('thumbnail');
module.exports.resizeImage = resizeImage;
