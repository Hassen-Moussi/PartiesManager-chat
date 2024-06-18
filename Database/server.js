const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Party, Profile, Message } = require('./db');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Fetch all parties
app.get('/parties', async (req, res) => {
  try {
    const parties = await Party.findAll();
    res.json(parties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new party
app.post('/parties', async (req, res) => {
  try {
    const { name } = req.body;
    const party = await Party.create({ name });
    res.json(party);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a party
app.delete('/parties/:id', async (req, res) => {
  try {
    const result = await Party.destroy({ where: { id: req.params.id } });
    if (result) {
      res.json({ message: 'Party deleted' });
    } else {
      res.status(404).json({ error: 'Party not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a party
app.put('/parties/:id', async (req, res) => {
  try {
    const party = await Party.findByPk(req.params.id);
    if (party) {
      await party.update(req.body);
      res.json(party);
    } else {
      res.status(404).json({ error: 'Party not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch all profiles
app.get('/profiles', async (req, res) => {
  try {
    const profiles = await Profile.findAll();
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new profile
app.post('/profiles', async (req, res) => {
  try {
    const { name } = req.body;
    const profile = await Profile.create({ name });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch all messages
app.get('/messages', async (req, res) => {
  try {
    const messages = await Message.findAll();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new message
app.post('/messages', async (req, res) => {
  try {
    const { text, senderId, receiverId } = req.body;
    const message = await Message.create({ text, senderId, receiverId });
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
