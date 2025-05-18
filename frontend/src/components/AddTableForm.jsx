import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Box
} from '@mui/material';

const AddTableForm = ({ open, onClose, onCreate }) => {
  const [tableName, setTableName] = useState('');
  const [columns, setColumns] = useState([{ name: '', type: 'TEXT' }]);

  const handleAddColumn = () => {
    setColumns([...columns, { name: '', type: 'TEXT' }]);
  };

  const handleChange = (index, key, value) => {
    const updated = [...columns];
    updated[index][key] = value;
    setColumns(updated);
  };

  const handleSubmit = () => {
    if (!tableName || columns.some(col => !col.name)) {
      alert('Table name and column names are required');
      return;
    }
    onCreate({ tableName, columns });
    onClose();
    setTableName('');
    setColumns([{ name: '', type: 'TEXT' }]);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Table</DialogTitle>
      <DialogContent>
        <TextField
          label="Table Name"
          fullWidth
          margin="dense"
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
        />
        {columns.map((col, idx) => (
          <Box key={idx} display="flex" gap={1} mt={1}>
            <TextField
              label="Column Name"
              value={col.name}
              onChange={(e) => handleChange(idx, 'name', e.target.value)}
            />
            <TextField
              label="Type"
              value={col.type}
              onChange={(e) => handleChange(idx, 'type', e.target.value)}
            />
          </Box>
        ))}
        <Button onClick={handleAddColumn} sx={{ mt: 1 }}>
          + Add Column
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>Create Table</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTableForm;
