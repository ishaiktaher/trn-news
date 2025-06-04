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

exports.getSingleArticle = async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug })
      .populate('author', 'name')
      .populate('category', 'name');
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching article', error: err.message });
  }
};

exports.createArticle = async (req, res) => {
  try {
    const { title, content, category, status = 'draft', tags = [] } = req.body;
    const slug = slugify(title.toLowerCase());
    // const thumbnail = req.file?.filename || null;
    const thumbnail = req.files?.thumbnail?.[0]?.filename || null;
    const featuredImage = req.files?.featuredImage?.[0]?.filename || null;

    const article = await Article.create({
      title,
      slug,
      content,
      status,
      tags: Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim()),
      category,
      thumbnail,
      featuredImage,
      author: req.user.id,
      publishedAt: status === 'published' ? new Date() : null,
    });

    res.status(201).json(article);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create article', error: err.message });
  }
};

exports.updateArticle = async (req, res) => {
  try {
    const updates = req.body;
    if (updates.title) {
      updates.slug = slugify(updates.title.toLowerCase());
    }
    if (updates.tags && typeof updates.tags === 'string') {
      updates.tags = updates.tags.split(',').map(t => t.trim());
    }

    if (req.file) {
      updates.thumbnail = req.file.filename;
    }

    // Update publishedAt only when status transitions to published
    const existingArticle = await Article.findById(req.params.id);
    if (
      existingArticle &&
      existingArticle.status !== 'published' &&
      updates.status === 'published'
    ) {
      updates.publishedAt = new Date();
    }

    const article = await Article.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(article);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update article', error: err.message });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: 'Article deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete article', error: err.message });
  }
};
