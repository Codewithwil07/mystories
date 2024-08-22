import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Typography, Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BookIcon from '@mui/icons-material/Book';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    onClose(); // Close the drawer after navigation
  };

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" noWrap>
            My Stories📔
          </Typography>
        </Box>
        <Divider />
        <List>
          <ListItem button onClick={() => handleNavigation('/dashboard')}>
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/stories')}>
            <ListItemIcon><BookIcon /></ListItemIcon>
            <ListItemText primary="Manage Story" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
