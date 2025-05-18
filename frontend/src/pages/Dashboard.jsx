import React, { useState } from 'react';
import {
  Box,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
} from '@mui/material';
import Sidebar from '../components/Sidebar';
import TableView from '../components/TableView';
import QueryRunner from '../components/QueryRunner';

const drawerWidth = 240;

const Dashboard = () => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [viewQueryRunner, setViewQueryRunner] = useState(false);

  const handleTableSelect = (tableName) => {
    setSelectedTable(tableName);
    setViewQueryRunner(false);
  };

  const handleQueryClick = () => {
    setSelectedTable(null);
    setViewQueryRunner(true);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
           Test
          </Typography>
          <Button color="inherit" onClick={handleQueryClick}>
            Run SQL
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Sidebar onSelectTable={handleTableSelect} />
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Container>
          {viewQueryRunner ? (
            <QueryRunner />
          ) : selectedTable ? (
            <TableView tableName={selectedTable} />
          ) : (
            <Typography>Select a table to view data.</Typography>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
