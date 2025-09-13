const express = require('express')
const router = express.Router()

// GET /configurations
router.get('/', async (req, res) => {
  try {
    const db = req.db
    const data = await db.collection('configuration').find({}).toArray()
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch configurations' })
  }
})

// POST /configurations
router.post('/', async (req, res) => {
  try {
    const db = req.db
    const newConfig = req.body
    const result = await db.collection('configuration').insertOne(newConfig)
    res.status(201).json(result)
  } catch (err) {
    res.status(500).json({ error: 'Failed to add configuration' })
  }
})

module.exports = router
