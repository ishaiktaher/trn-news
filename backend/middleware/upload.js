const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Ensure upload directory exists
const uploadPath = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Multer storage
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG/PNG/WebP are allowed.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});

const uploadFields = upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'featuredImage', maxCount: 1 }
]);

const resizeImage = async (req, res, next) => {
  const images = req.files;

  if (!images || (!images.thumbnail && !images.featuredImage)) {
    return next();
  }

  try {
    if (images.thumbnail) {
      const thumbFilename = `thumb-${Date.now()}.jpeg`;
      await sharp(images.thumbnail[0].buffer)
        .resize(400, 225)
        .toFormat('jpeg')
        .jpeg({ quality: 80 })
        .toFile(path.join(uploadPath, thumbFilename));
      req.body.thumbnail = thumbFilename;
    }

    if (images.featuredImage) {
      const featuredFilename = `featured-${Date.now()}.jpeg`;
      await sharp(images.featuredImage[0].buffer)
        .resize(800, 450)
        .toFormat('jpeg')
        .jpeg({ quality: 80 })
        .toFile(path.join(uploadPath, featuredFilename));
      req.body.featuredImage = featuredFilename;
    }

    next();
  } catch (err) {
    next(err);
  }
};

// ✅ Export properly
module.exports = {
  upload: uploadFields,
  resizeImage
};
