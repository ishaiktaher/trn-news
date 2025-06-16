const Article = require('../models/Article');
const slugify = require('slugify');
const Category = require('../models/Category');

exports.getAllArticles = async (req, res) => {
  try {
    const filter = {};

    // Filter by category slug if provided
    if (req.query.category) {
      const category = await Category.findOne({ slug: req.query.category });
      if (category) {
        filter.category = category._id;
      } else {
        return res.status(404).json({ message: 'Category not found' });
      }
    }

    const articles = await Article.find(filter)
      .populate('author', 'name')
      .populate('category', 'name')
      .sort({ createdAt: -1 });

    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch articles', error: err.message });
  }
};

// exports.getSingleArticle = async (req, res) => {
//   try {
//     const article = await Article.findOne({ slug: req.params.slug })
//       .populate('author', 'name')
//       .populate('category', 'name');
//     if (!article) return res.status(404).json({ message: 'Article not found' });
//     res.json(article);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching article', error: err.message });
//   }
// };

exports.getSingleArticle = async (req, res) => {
  try {
    const article = await Article.findOneAndUpdate(
      { slug: req.params.slug },
      { $inc: { viewsCount: 1 } }, // 👈 Increment views
      { new: true }
    )
    .populate('author', 'name')
    .populate('category', 'name');

    if (!article) return res.status(404).json({ message: 'Article not found' });

    res.json(article);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching article', error: err.message });
  }
};

// exports.createArticle = async (req, res) => {
//   try {
//     const {
//       title,
//       content,
//       category,
//       status = 'draft',
//       tags = []
//     } = req.body;

//     const slug = slugify(title, {
//       lower: true,          // lowercase everything
//       strict: true,         // remove special characters except letters, numbers, and hyphens
//       trim: true
//     });

//     const thumbnail = req.body.thumbnail || null;
//     const featuredImage = req.body.featuredImage || null;

//     if (!title || !content || !category) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }
    
//     if (featuredImage && typeof featuredImage !== 'string') {
//       return res.status(400).json({ message: 'Invalid featured image' });
//     }
    
//     const article = await Article.create({
//       title,
//       slug,
//       content,
//       status,
//       tags: Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim()),
//       category,
//       thumbnail,
//       featuredImage,
//       author: req.user.id,
//       publishedAt: status === 'published' ? new Date() : null,
//     });

//     res.status(201).json(article);
//   } catch (err) {
//     res.status(400).json({ message: 'Failed to create article', error: err.message });
//   }
// };

exports.createArticle = async (req, res) => {
  try {
    const {
      title,
      content,
      category,
      status = 'draft',
      tags = []
    } = req.body;

    if (!title || !content || !category) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const slug = slugify(title, {
      lower: true,
      strict: true,
      trim: true
    });

    const thumbnail = req.body.thumbnail || null;
    const featuredImage = req.body.featuredImage || null;

    // Check if a draft by the same user with same slug already exists
    const existingDraft = await Article.findOne({
      slug,
      author: req.user.id,
      status: 'draft'
    });

    const tagsArray = Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim());

    const payload = {
      title,
      slug,
      content,
      status,
      tags: tagsArray,
      category,
      thumbnail,
      featuredImage,
      author: req.user.id,
      publishedAt: status === 'published' ? new Date() : null,
    };

    let article;

    if (existingDraft) {
      // Update existing draft
      article = await Article.findByIdAndUpdate(existingDraft._id, payload, { new: true });
    } else {
      // Create new article
      article = await Article.create(payload);
    }

    res.status(201).json(article);
  } catch (err) {
    console.error('Create error:', err);
    res.status(400).json({ message: 'Failed to create article', error: err.message });
  }
};


exports.updateArticle = async (req, res) => {
  try {
    const updates = { ...req.body };

    // Handle tags if sent as string
    if (updates.tags && typeof updates.tags === 'string') {
      updates.tags = updates.tags.split(',').map(t => t.trim());
    }

    // Regenerate slug if title changes
    if (updates.title) {
      updates.slug = slugify(updates.title.toLowerCase());
    }

    // Ensure updated featured image and thumbnail are picked up from req.body
    if (req.body.featuredImage) {
      updates.featuredImage = req.body.featuredImage;
    }

    if (req.body.thumbnail) {
      updates.thumbnail = req.body.thumbnail;
    }

    // Handle status change to published → set publishedAt
    const existing = await Article.findById(req.params.id);
    if (
      existing &&
      existing.status !== 'published' &&
      updates.status === 'published'
    ) {
      updates.publishedAt = new Date();
    }

    const updatedArticle = await Article.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    res.json(updatedArticle);
  } catch (err) {
    console.error('Update error:', err);
    res.status(400).json({ message: 'Failed to update article', error: err.message });
  }
};


const fs = require('fs');
const path = require('path');

exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });

    // Define image paths
    const imagePaths = [];
    if (article.featuredImage) imagePaths.push(path.join(__dirname, '..', 'uploads', article.featuredImage));
    if (article.thumbnail) imagePaths.push(path.join(__dirname, '..', 'uploads', article.thumbnail));

    // Delete images from disk
    imagePaths.forEach((imgPath) => {
      if (fs.existsSync(imgPath)) {
        fs.unlink(imgPath, (err) => {
          if (err) console.error('Failed to delete image:', imgPath, err);
        });
      }
    });

    // Delete article from DB
    await article.deleteOne();

    res.json({ message: 'Article and associated images deleted' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ message: 'Failed to delete article', error: err.message });
  }
};
