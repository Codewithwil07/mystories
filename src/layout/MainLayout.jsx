import React, { useState } from 'react';
import { CssBaseline, Box, AppBar, Toolbar, Typography } from '@mui/material';
import Sidebar from './Sidebar'; // Adjust the import path as needed

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Box
        component='main'
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
