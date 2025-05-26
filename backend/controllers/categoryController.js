const Category = require('../models/Category');
const slugify = require('slugify');

exports.getAllCategories = async (req, res) => {
  const categories = await Category.find().sort('name');
  res.json(categories);
};

exports.createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const slug = slugify(name.toLowerCase());
    const category = await Category.create({ name, slug });
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create category', error: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const slug = slugify(name.toLowerCase());
    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      { name, slug },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update category', error: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete category', error: err.message });
  }
};
