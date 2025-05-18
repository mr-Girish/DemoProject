const express = require('express');
const cors = require('cors');
require('dotenv').config();

const pool = require('./db'); 
const app = express();
app.use(cors());
app.use(express.json());

// Test DB Connection 
pool.connect()
  .then(() => {
    console.log('✅ Connected to PostgreSQL database successfully');
  })
  .catch((err) => {
    console.error('Failed to connect to PostgreSQL:', err.message);
  });

// Routes
const tablesRoute = require('./routes/tables');
const queryRoute = require('./routes/query');
const crudRoute = require('./routes/crud');
const createTableRoute = require('./routes/createTable');
const deleteTableRoute = require('./routes/deleteTable');
const tableColumnsRoute = require('./routes/tableColumn');


app.use('/api/tables', tablesRoute);
app.use('/api/query', queryRoute);
app.use('/api/crud', crudRoute);
app.use('/api/create-table', createTableRoute);
app.use('/api/delete-table', deleteTableRoute);

app.use('/api/table-columns', tableColumnsRoute);





// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
