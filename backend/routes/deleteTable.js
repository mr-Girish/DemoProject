const express = require('express');
const router = express.Router();
const pool = require('../db');

router.delete('/:table', async (req, res) => {
  const { table } = req.params;
  try {
    await pool.query(`DROP TABLE IF EXISTS "${table}"`);
    res.json({ success: true, message: `Table '${table}' deleted.` });
  } catch (err) {
    console.error('Error deleting table:', err.message);
    res.status(500).json({ error: 'Failed to delete table' });
  }
});

module.exports = router;
