const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/:table', async (req, res) => {
  const { table } = req.params;
  try {
    const result = await pool.query(`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = $1
      ORDER BY ordinal_position
    `, [table]);
    const columns = result.rows.map(row => row.column_name);
    res.json(columns);
  } catch (err) {
    console.error('Error fetching columns:', err.message);
    res.status(500).json({ error: 'Failed to fetch columns' });
  }
});

module.exports = router;
