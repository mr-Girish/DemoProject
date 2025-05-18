import React, { useEffect, useState } from 'react';
import {
  List, ListItem, ListItemText, Button, Divider, Box,
  IconButton, Collapse, ListItemIcon
} from '@mui/material';
import AddTableForm from './AddTableForm';
import axios from '../api';
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import TableChartIcon from '@mui/icons-material/TableChart';

const Sidebar = ({ onSelectTable }) => {
  const [tables, setTables] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [openTablesList, setOpenTablesList] = useState(false); 
  const fetchTables = () => {
    axios.get('/tables')
      .then(res => setTables(res.data))
      .catch(err => {
        console.error('Failed to load tables:', err);
        setTables([]);
      });
  };

  useEffect(() => {
    fetchTables();
  }, []);

  // To Create Table
  const handleCreateTable = async (tableData) => {
    try {
      await axios.post('/create-table', tableData);
      fetchTables();
      toast.success(`Table '${tableData.tableName}' Created!`);
    } catch (err) {
      toast.error(`Failed to create table: ${err.response?.data?.error}`);
    }
  };

  // To Delete Table
  const handleDeleteTable = async (table) => {
    if (!window.confirm(`Are you sure you want to delete table '${table}'? This cannot be undone.`)) return;
    try {
      await axios.delete(`/delete-table/${table}`);
      fetchTables();
      toast.success(`Table '${table}' deleted`);
    } catch (err) {
      console.error('Delete table error:', err);
      toast.error(`Failed to delete table '${table}'`);
    }
  };

  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ m: 1 }}
        onClick={() => setOpenForm(true)}
      >
        ➕ Add Table
      </Button>

      <Divider />

      <List>
        {/* Collapsible Tables Main Tab */}
        <ListItem button onClick={() => setOpenTablesList(!openTablesList)}>
          <ListItemIcon><TableChartIcon /></ListItemIcon>
          <ListItemText primary="Tables" />
          {openTablesList ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={openTablesList} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 2 }}>
            {tables.length === 0 ? (
              <ListItem>
                <ListItemText primary="No tables found" />
              </ListItem>
            ) : (
              tables.map((table) => (
                <ListItem
                  key={table}
                  secondaryAction={
                    <>
                      <IconButton edge="end" onClick={() => onSelectTable(table)}>
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton edge="end" onClick={() => handleDeleteTable(table)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  }
                  button
                >
                  <ListItemText primary={table} />
                </ListItem>
              ))
            )}
          </List>
        </Collapse>
      </List>

      <AddTableForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onCreate={handleCreateTable}
      />
    </Box>
  );
};

export default Sidebar;
