import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  IconButton,
  Typography,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Menu,
  MenuItem,
  Divider,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MainLayout from '../layout/MainLayout';
import { useNavigate } from 'react-router-dom';
import { useGetStoriesQuery, useDeleteStoryMutation } from '../redux/api'; // Import hooks from the API slice

const StoriesPage = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);

  const { data: stories = [], isLoading, isError } = useGetStoriesQuery(); // Fetch stories from the API
  const [deleteStory] = useDeleteStoryMutation(); // Hook to delete a story

  const handleFilterOpen = () => setFilterOpen(true);
  const handleFilterClose = () => setFilterOpen(false);
  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleCategoryChange = (event) => setCategory(event.target.value);
  const handleStatusChange = (event) => setStatus(event.target.value);
  
  const handleChangePage = (event, value) => setCurrentPage(value);

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    onClose(); // Close the drawer after navigation
  };

  const handleDelete = async (id) => {
    await deleteStory(id);
    setAnchorEl(null);
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return <Typography>Error loading stories...</Typography>;
  }

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  // Slice the stories array for the current page
  const paginatedStories = stories.slice(startIndex, endIndex);

  return (
    <MainLayout>
      <Box sx={{ p: 3 }}>
        {/* Title */}
        <Typography variant='h4' gutterBottom>
          Stories
        </Typography>

        {/* Navbar */}
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            variant='outlined'
            placeholder='Search by writer/title'
            sx={{ width: '40%' }}
            size='small'
          />
          <Button
            variant='contained'
            color='primary'
            sx={{ marginLeft: '280px' }}
            onClick={handleFilterOpen}
            startIcon={<FilterListIcon />}
          >
            Filter
          </Button>
          <Button
            variant='contained'
            color='success'
            startIcon={<AddIcon />}
            onClick={() => handleNavigation('/add-story')}
          >
            Add Story
          </Button>
        </Box>

        {/* Filter Modal */}
        <Modal
          open={filterOpen}
          onClose={handleFilterClose}
          aria-labelledby='filter-modal-title'
          aria-describedby='filter-modal-description'
        >
          <Box
            sx={{
              width: 400,
              bgcolor: 'background.paper',
              p: 3,
              borderRadius: 1,
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Typography id='filter-modal-title' variant='h6' component='h2'>
              Filter
            </Typography>
            <Divider sx={{ my: 2 }} />
            {/* Filter Form */}
            <FormControl fullWidth margin='normal'>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                onChange={handleCategoryChange}
                label='Category'
              >
                <MenuItem value='financial'>Financial</MenuItem>
                <MenuItem value='technology'>Technology</MenuItem>
                <MenuItem value='health'>Health</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin='normal'>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                onChange={handleStatusChange}
                label='Status'
              >
                <MenuItem value='publish'>Publish</MenuItem>
                <MenuItem value='draft'>Draft</MenuItem>
              </Select>
            </FormControl>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}
            >
              <Button
                variant='outlined'
                color='error'
                onClick={handleFilterClose}
              >
                Cancel
              </Button>
              <Box>
                <Button
                  variant='outlined'
                  onClick={() => {
                    // Reset filters logic
                    setCategory('');
                    setStatus('');
                  }}
                  sx={{ mr: 2 }}
                >
                  Reset
                </Button>
                <Button variant='contained' onClick={handleFilterClose}>
                  Apply
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>

        {/* Stories Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Writers</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Keyword</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedStories.map((story, index) => (
                <TableRow key={story.id}>
                  <TableCell>{startIndex + index + 1}</TableCell>
                  <TableCell>{story.title}</TableCell>
                  <TableCell>{story.writers.join(', ')}</TableCell>
                  <TableCell>{story.category}</TableCell>
                  <TableCell>{story.keyword}</TableCell>
                  <TableCell>{story.status}</TableCell>
                  <TableCell>
                    <IconButton onClick={handleMenuClick}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      <MenuItem
                        onClick={() => handleNavigation(`/story/${story.id}`)}
                      >
                        Edit & Details
                      </MenuItem>
                      <MenuItem onClick={() => handleDelete(story.id)}>
                        Delete
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box
          sx={{
            mt: 2,
            display: 'flex',
            justifyContent: 'space-between',
            gap: 2,
            alignItems: 'center',
          }}
        >
          <Typography variant='body2'>
            Menampilkan {startIndex + 1} - {Math.min(endIndex, stories.length)} dari {stories.length}
          </Typography>
          <Pagination
            count={Math.ceil(stories.length / rowsPerPage)}
            page={currentPage}
            onChange={handleChangePage}
          />
        </Box>
      </Box>
    </MainLayout>
  );
};

export default StoriesPage;
