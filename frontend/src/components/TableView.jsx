import React, { useEffect, useState } from 'react';
import {
  Typography,
  Button,
  IconButton,
  Box
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from '../api';
import CRUDForm from './CRUDForm';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';

const TableView = ({ tableName }) => {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    setRows([]);
    setColumns([]);
    fetchData();
  }, [tableName]);
  
  const fetchData = async () => {
    if (!tableName) return;
    try {
      const res = await axios.get(`/crud/${tableName}`);
      const data = res.data;
      console.log("datadatadatadata",data)
      let fields = [];
  
      if (data.length > 0) {
        fields = Object.keys(data[0]);
      } else {
        const schemaRes = await axios.get(`/table-columns/${tableName}`);
        fields = schemaRes.data;
      }
  
      const baseColumns = fields.map(field => ({
        field,
        headerName: field,
        flex: 1,
      }));
  
      const actionsColumn = {
        field: 'actions',
        headerName: 'Actions',
        renderCell: (params) => (
          <>
            <IconButton onClick={() => handleEdit(params.row)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(params.row.id)}>
              <DeleteIcon />
            </IconButton>
          </>
        ),
      };
  
      setColumns([...baseColumns, actionsColumn]);
      setRows(data.map((row, index) => ({
        id: row.id || row.ID || index,
        ...row,
      })));
    } catch (error) {
      console.error('Failed to fetch table data or columns:', error);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, [tableName]);

  const handleAdd = () => {
    setEditData(null);
    setOpenForm(true);
  };

  const handleEdit = (row) => {
    setEditData(row);
    setOpenForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/crud/delete/${tableName}/${id}`);
      fetchData();
      toast.success(`Row Delete!`);
      
    } catch (err) {
      toast.error(`Failed to delete row`);
      console.error('Failed to delete row:', err);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editData) {
        await axios.put(`/crud/update/${tableName}/${editData.id}`, formData);
        toast.success(`Row Edited!`);

      } else {
        await axios.post(`/crud/create/${tableName}`, formData);
        toast.success(`Row Inserted!`);

      }
      fetchData();
    } catch (err) {
      console.log("errerrerr",err)
      toast.error(`Form submission failed`);
      console.error('Form submission failed:', err);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {tableName} Table
      </Typography>

      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={handleAdd}
      >
        + Add New Record
      </Button>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>

      <CRUDForm
        open={openForm}
        handleClose={() => setOpenForm(false)}
        fields={columns.map(col => col.field).filter(f => f !== 'actions')}
        initialData={editData}
        onSubmit={handleFormSubmit}
      />
    </Box>
  );
};

export default TableView;
