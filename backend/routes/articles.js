const express = require('express');
const router = express.Router();
const {
  getAllArticles,
  getSingleArticle,
  createArticle,
  updateArticle,
  deleteArticle
} = require('../controllers/articleController');
const { upload, resizeImage } = require('../middleware/upload');


const { protect, authorizeRoles } = require('../middleware/auth');

// Public
router.get('/', getAllArticles);
router.get('/:slug', getSingleArticle);

// Protected (editor/admin)
// In article routes:
router.post(
  '/',
  protect,
  authorizeRoles('editor', 'admin', 'author'),
  upload,
  resizeImage,
  createArticle
);

router.put(
  '/:id',
  protect,
  authorizeRoles('editor', 'admin', 'author'),
  upload,
  resizeImage,
  updateArticle
);

router.delete('/:id', protect, authorizeRoles('editor', 'admin', 'author'), deleteArticle);

// routes/tags.js
router.get('/tags', async (req, res) => {
  const tags = await Article.distinct('tags');
  res.json(tags);
});

module.exports = router;
