import React, { useState, useEffect } from 'react';
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
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import MainLayout from '../layout/MainLayout';
import BreadCrumbs from '../components/BreadCrumbs';
import TagsInput from '../components/TagsInput';
import ChaptersTable from '../components/ChaptersTable';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useGetStoryByIdQuery, useUpdateStoryMutation } from '../redux/api';

const StoryDetail = () => {
  const { id } = useParams(); // Get story ID from URL
  const navigate = useNavigate();

  // Fetch story data
  const { data: story, isLoading, error } = useGetStoryByIdQuery(id);
  const [updateStory] = useUpdateStoryMutation();

  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [title, setTitle] = useState('');
  const [writers, setWriters] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (story) {
      setCategory(story.category);
      setStatus(story.status);
      setTitle(story.title);
      setWriters(story.writers);
      setSynopsis(story.synopsis);
    }
  }, [story]);

  const handleCategoryChange = (event) => setCategory(event.target.value);
  const handleStatusChange = (event) => setStatus(event.target.value);
  const handleEdit = () => setIsEditing(true);
  const handleSave = async () => {
    try {
      await updateStory({
        id,
        title,
        writers,
        category,
        status,
        synopsis,
        // Add other fields if needed
      }).unwrap();
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to save story', err);
    }
  };
  const handleCancel = () => {
    setIsEditing(false);
  };

  const CustomTextField = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-root': {
      height: '140px',
      alignItems: 'flex-start',
    },
    '& .MuiInputBase-input': {
      padding: theme.spacing(1),
    },
  }));

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching story.</p>;

  return (
    <MainLayout>
      <Box sx={{ p: 3 }}>
        <BreadCrumbs
          breadcrumbItems={[
            { label: 'Stories', href: '/stories' },
            { label: 'Story Detail' },
          ]}
        />

        {/* Title */}
        <Typography variant='h4' gutterBottom>
          Story Detail
        </Typography>

        {/* Navigation Button */}
        <Button
          variant='contained'
          color='secondary'
          onClick={() => navigate('/stories')}
          startIcon={<EditIcon />}
        >
          Back
        </Button>

        {/* Form Section */}
        <Box sx={{ mt: 2, mb: 2 }}>
          <Box display='flex' gap='20px'>
            <TextField
              fullWidth
              label='Title'
              variant='outlined'
              margin='normal'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={!isEditing}
            />
            <TextField
              fullWidth
              label='Writers'
              variant='outlined'
              margin='normal'
              value={writers}
              onChange={(e) => setWriters(e.target.value)}
              disabled={!isEditing}
            />
          </Box>

          <CustomTextField
            fullWidth
            label='Synopsis'
            variant='outlined'
            margin='normal'
            multiline
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
            disabled={!isEditing}
          />

          <Box display='flex' gap='20px' alignItems='center'>
            <FormControl
              sx={{ width: '455px' }}
              variant='outlined'
              margin='normal'
              disabled={!isEditing}
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
            <TagsInput disabled={!isEditing} />
          </Box>

          <Box display='flex' gap='20px'>
            <TextField
              fullWidth
              label='Cover Image'
              variant='outlined'
              margin='normal'
              type='file'
              disabled={!isEditing}
            />
            <FormControl
              fullWidth
              variant='outlined'
              margin='normal'
              disabled={!isEditing}
            >
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

          {/* Save/Edit Buttons */}
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            {isEditing ? (
              <>
                <Button
                  variant='contained'
                  color='success'
                  startIcon={<SaveIcon />}
                  onClick={handleSave}
                >
                  Save Changes
                </Button>
                <Button
                  variant='outlined'
                  color='error'
                  onClick={handleCancel}
                  startIcon={<CloseIcon />}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                variant='contained'
                color='primary'
                startIcon={<EditIcon />}
                onClick={handleEdit}
              >
                Edit Story
              </Button>
            )}
          </Box>
        </Box>

        {/* Chapters Table */}
        <Box display='flex' gap='20px'>
          <ChaptersTable />
        </Box>
      </Box>
    </MainLayout>
  );
};

export default StoryDetail;
