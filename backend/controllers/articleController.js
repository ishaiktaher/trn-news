const Article = require('../models/Article');
const slugify = require('slugify');

exports.getAllArticles = async (req, res) => {
  const articles = await Article.find()
    .populate('author', 'name')
    .populate('category', 'name')
    .sort({ createdAt: -1 });
  res.json(articles);
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
    const { title, content, category, status, tags } = req.body;
    const slug = slugify(title.toLowerCase());
    const thumbnail = req.file?.filename || null;

    const article = await Article.create({
      title,
      slug,
      content,
      status,
      tags,
      category,
      thumbnail,
      author: req.user.id,
      publishedAt: status === 'published' ? new Date() : null
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
    if (req.file) {
      updates.thumbnail = req.file.filename;
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
