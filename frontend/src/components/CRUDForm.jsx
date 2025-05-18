import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button
} from '@mui/material';

const CRUDForm = ({ open, handleClose, fields, initialData = {}, onSubmit }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSubmit(formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{initialData ? 'Edit Record' : 'Add New Record'}</DialogTitle>
      <DialogContent>
        {fields.map((field) => (
          field === 'id' ? null : (
            <TextField
              key={field}
              margin="dense"
              label={field}
              fullWidth
              value={formData[field] || ''}
              onChange={(e) => handleChange(field, e.target.value)}
            />
          )
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CRUDForm;
