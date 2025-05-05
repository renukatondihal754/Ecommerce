const express = require('express');
const router = express.Router();
const db = require('../config/dbConfig');

router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM categories');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories', details: err });
  }
});

module.exports = router;
