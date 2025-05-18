import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from '../api';

const QueryRunner = () => {
  const [query, setQuery] = useState('');
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  const handleRunQuery = () => {
    axios.post('/query', { query })
      .then(res => {
        const data = res.data;
        if (data.length > 0) {
          setColumns(Object.keys(data[0]).map(key => ({ field: key, headerName: key, flex: 1 })));
          setRows(data.map((row, index) => ({ id: index, ...row })));
        } else {
          setColumns([]);
          setRows([]);
        }
      })
      .catch(err => alert(err.response?.data?.error || 'Query error'));
  };

  return (
    <div>
      <Typography variant="h6">Run SQL Query</Typography>
      <TextField
        label="SQL Query"
        multiline
        rows={4}
        fullWidth
        margin="normal"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button variant="contained" onClick={handleRunQuery}>
        Execute
      </Button>
      <div style={{ height: 400, marginTop: 16 }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} />
      </div>
    </div>
  );
};

export default QueryRunner;
