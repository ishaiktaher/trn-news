const express = require('express');
const router = express.Router();
const {
  getAllArticles,
  getSingleArticle,
  createArticle,
  updateArticle,
  deleteArticle
} = require('../controllers/articleController');
const upload = require('../middleware/upload');
const { resizeImage } = require('../middleware/upload');

const { protect, authorizeRoles } = require('../middleware/auth');

// Public
router.get('/', getAllArticles);
router.get('/:slug', getSingleArticle);

// Protected (editor/admin)
// In article routes:
router.post(
  '/',
  protect,
  authorizeRoles('editor', 'admin'),
  upload,
  resizeImage,
  createArticle
);

router.put(
  '/:id',
  protect,
  authorizeRoles('editor', 'admin'),
  upload,
  resizeImage,
  updateArticle
);
router.delete('/:id', protect, authorizeRoles('editor', 'admin'), deleteArticle);



module.exports = router;
