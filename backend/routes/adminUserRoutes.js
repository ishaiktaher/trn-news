const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const verifyAdmin = require('../middleware/verifyAdmin');
const router = express.Router();

// Get all users
router.get('/', verifyAdmin('admin'), async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

router.post('/', verifyAdmin('admin'), async (req, res) => {
  try {
    console.log("User req body ", req.body);

    const { name, email, password, role } = req.body;
    console.log("User Form values ", name, email, password, role);

    const existing = await User.findOne({ email });
    console.log("User existing ?  ", existing);

    if (existing) return res.status(400).json({ msg: 'Email already exists' });

    const user = new User({ name, email, password, role });
    console.log("User Created ?  ", user);

    await user.save();
    console.log("User Saved ?  ", user);

    res.status(201).json({ msg: 'User created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});


// Update role
router.patch('/:id/role', verifyAdmin, async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { role: req.body.role });
  res.json({ msg: 'Role updated' });
});

module.exports = router;
