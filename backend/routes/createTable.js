const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/', async (req, res) => {
  const { tableName, columns } = req.body;

  if (!tableName || !columns || columns.length === 0) {
    return res.status(400).json({ error: 'Table name and at least one column are required' });
  }

  // Build column definitions (excluding 'id')
  const columnDefs = columns
    .map(col => `"${col.name.toLowerCase()}" ${col.type}`)
    .join(', ');

  // Always add an auto-incrementing 'id' as PRIMARY KEY
  const createQuery = `
    CREATE TABLE "${tableName}" (
      id SERIAL PRIMARY KEY,
      ${columnDefs}
    )
  `;

  try {
    await pool.query(createQuery);
    res.json({ success: true, message: `Table '${tableName}' created.` });
  } catch (err) {
    console.error('Error creating table:', err.message);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
