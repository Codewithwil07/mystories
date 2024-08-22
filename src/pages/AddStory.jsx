import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import MainLayout from '../layout/MainLayout';
import BreadCrumbs from '../components/BreadCrumbs';
import { styled } from '@mui/material/styles';
import TagsInput from '../components/TagsInput';
import ChaptersTable from '../components/ChaptersTable';
import { useNavigate } from 'react-router-dom';
import ButtonStyle from '../components/Button';

const AddStory = () => {
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');

  const handleCategoryChange = (event) => setCategory(event.target.value);
  const handleStatusChange = (event) => setStatus(event.target.value);

  const handleSave = () => {
    // Save story logic
    console.log('Story saved');
  };

  const handleCancel = () => {
    // Navigate back or reset form logic
    console.log('Cancelled');
  };

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  const CustomTextField = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-root': {
      height: '140px', // Adjust height here
      alignItems: 'flex-start', // Align text at the top
    },
    '& .MuiInputBase-input': {
      padding: theme.spacing(1), // Adjust padding inside the input
    },
  }));

  return (
    <MainLayout>
      <Box sx={{ p: 3 }}>
        <BreadCrumbs
          breadcrumbItems={[
            { label: 'Stories', href: '/stories' },
            { label: 'Add Story' },
          ]}
        />

        {/* Title */}
        <Typography variant='h4' gutterBottom>
          Add Story
        </Typography>

        <ButtonStyle label='back' color={'secondary'} onClick={() =>handleNavigation('/stories')}>
          Back
        </ButtonStyle>

        {/* Form Section */}
        <Box sx={{ mt: 2, mb: 2 }}>
          <Box display={'flex'} gap={'20px'}>
            <TextField
              fullWidth
              label='Title'
              variant='outlined'
              margin='normal'
            />
            <TextField
              fullWidth
              label='Writers'
              variant='outlined'
              margin='normal'
            />
          </Box>
          <CustomTextField
            fullWidth
            label='Synopsis'
            variant='outlined'
            margin='normal'
            multiline
          />
          <Box display={'flex'} gap={'20px'} alignItems={'center'}>
            <FormControl
              sx={{ width: '455px' }}
              variant='outlined'
              margin='normal'
            >
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
            <TagsInput />
          </Box>

          <Box display={'flex'} gap={'20px'}>
            <TextField
              fullWidth
              label='Cover Image'
              variant='outlined'
              margin='normal'
              type='file'
            />
            <FormControl fullWidth variant='outlined' margin='normal'>
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
          </Box>

          <Button
            variant='contained'
            color='success'
            startIcon={<AddIcon />}
            onClick={() => handleNavigation('/add-chapter')}
            sx={{ position: 'relative', left: '48rem' }}
          >
            Add Chapter
          </Button>
        </Box>

        <Box display={'flex'} gap={'20px'}>
          <ChaptersTable />
        </Box>

        {/* Buttons Section */}
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button
            variant='contained'
            color='success'
            startIcon={<AddIcon />}
            onClick={handleSave}
          >
            Save
          </Button>
          <Button
            variant='outlined'
            color='error'
            onClick={handleCancel}
            startIcon={<CloseIcon />}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </MainLayout>
  );
};

export default AddStory;
