const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/user', async (req, res) => {
  const { username, email } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ username, email });
      await user.save();
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
