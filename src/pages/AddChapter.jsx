import React, { useState } from 'react';
import { Typography, TextField, Paper, Button, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import MainLayout from '../layout/MainLayout';
import ButtonStyle from '../components/Button';

import BreadCrumbs from '../components/BreadCrumbs';

function AddChapter() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleCancel = () => {
    // Handle cancel action (e.g., navigate back or clear fields)
    navigate(-1); // Navigate to the previous page
  };

  const handleSave = () => {
    // Handle save action (e.g., save chapter data)
    console.log('Chapter saved:', { title, content });
    // After saving, you might want to navigate to another page
  };

const handleNavigation = (path) => {
    navigate(path);
    onclose()
}


  return (
    <MainLayout>
      <Paper sx={{ padding: 2, marginTop: 2 }}>
        {/* Breadcrumbs */}
        <BreadCrumbs
          breadcrumbItems={[
            { label: 'Stories', href: '/stories' },
            { label: 'Add Story', href: '/add-story' },
            { label: 'Add Chapter' },
          ]}
        />

        {/* Title */}
        <Typography variant='h4' sx={{ marginTop: 2 }}>
          Add Chapter
        </Typography>

        <ButtonStyle
          label='back'
          color={'secondary'}
          onClick={() => handleNavigation('/add-story')}
        >
          Back
        </ButtonStyle>

        {/* Chapter Title Input */}
        <TextField
          label='Chapter Title'
          value={title}
          onChange={handleTitleChange}
          fullWidth
          margin='normal'
          variant='outlined'
        />

        {/* React Quill Editor */}
        <ReactQuill
          value={content}
          onChange={handleContentChange}
          style={{ height: '300px', marginTop: '16px' }}
        />

        {/* Buttons */}
        <Stack direction='row' spacing={2} sx={{ marginTop: 10 }}>
          <Button variant='outlined' color='secondary' onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant='contained' color='primary' onClick={handleSave}>
            Save
          </Button>
        </Stack>
      </Paper>
    </MainLayout>
  );
}

export default AddChapter;
