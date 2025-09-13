const express = require('express');
const router = express.Router();

// POST /add-user
router.post('/add-user', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  try {
    const userCollection = req.db.collection('users'); // Replace 'users' with your collection name
    const result = await userCollection.insertOne({ name });
    res.status(201).json({ message: 'User added successfully', userId: result.insertedId });
  } catch (error) {
    console.error('Error inserting user:', error);
    res.status(500).json({ error: 'Failed to add user' });
  }
});

module.exports = router;