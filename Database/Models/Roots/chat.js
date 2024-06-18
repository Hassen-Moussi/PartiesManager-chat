

const express = require('express');
const router = express.Router();
const Profile = require('../db/models/profile');
const Message = require('../db/models/message');

// Get all profiles
router.get('/profiles', async (req, res) => {
  try {
    const profiles = await Profile.findAll();
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new profile
router.post('/profiles', async (req, res) => {
  try {
    const { name } = req.body;
    const profile = await Profile.create({ name });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all messages
router.get('/messages', async (req, res) => {
  try {
    const messages = await Message.findAll();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new message
router.post('/messages', async (req, res) => {
  try {
    const { text } = req.body;
    const message = await Message.create({ text });
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
