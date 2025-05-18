const express = require('express');
const router = express.Router();
const pool = require('../db');



// fetch all Tables
router.get('/:table', async (req, res) => {
  const { table } = req.params;
  try {
    const result = await pool.query(`SELECT * FROM "${table}" LIMIT 100`);
    res.json(result.rows);
  } catch (err) {
    console.error('Read error:', err);
    res.status(400).json({ error: 'Invalid table or query failed' });
  }
});

module.exports = router;


// This is for CREATE Row
router.post('/create/:table', async (req, res) => {
  const { table } = req.params;
  const data = req.body;

  const keys = Object.keys(data);
  const values = Object.values(data);
  const placeholders = keys.map((_, i) => `$${i + 1}`).join(',');

  const query = `INSERT INTO "${table}" (${keys.join(',')}) VALUES (${placeholders}) RETURNING *`;

  try {
    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Insert error:', err.message);
    res.status(400).json({ error: 'Insert failed' });
  }
});


/**
 * This is for UPDATE Row
 */
router.put('/update/:table/:id', async (req, res) => {
  const { table, id } = req.params;
  const data = req.body;

  
  const keys = Object.keys(data);
  const values = Object.values(data);
  const setClause = keys.map((key, i) => `"${key}" = $${i + 1}`).join(', ');

  try {
    // Check if record exists
    const existsResult = await pool.query(
      `SELECT 1 FROM "${table}" WHERE id = $1 LIMIT 1`,
      [id]
    );

    if (existsResult.rowCount === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    //  Update if exists
    const query = `UPDATE "${table}" SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`;
    const result = await pool.query(query, [...values, id]);
    res.json(result.rows[0]);

  } catch (err) {
    console.error('Update error:', err.message);
    res.status(400).json({ error: 'Update failed' });
  }
});

/**
 * This is for DELETE Row
 */
router.delete('/delete/:table/:id', async (req, res) => {
  const { table, id } = req.params;

  try {
    // Check if record exists
    const existsResult = await pool.query(
      `SELECT 1 FROM "${table}" WHERE id = $1 LIMIT 1`,
      [id]
    );

    if (existsResult.rowCount === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    //  Delete if exists
    await pool.query(`DELETE FROM "${table}" WHERE id = $1`, [id]);
    res.json({ success: true });

  } catch (err) {
    console.error('Delete error:', err.message);
    res.status(400).json({ error: 'Delete failed' });
  }
});

module.exports = router;
