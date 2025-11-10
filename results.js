const express = require('express');
const router = express.Router();
const Result = require('../models/Result');

router.post('/', async (req, res) => {
  try {
    console.log('Saving result:', req.body);             // Add this line
    const result = new Result(req.body);
    await result.save();
    res.json({ success: true });
  } catch (error) {
    console.error('Error saving result:', error);        // Add this line
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/leaderboard', async (req, res) => {
  const topScores = await Result.find().sort({ wpm: -1 }).limit(10);
  res.json(topScores);
});

module.exports = router;
