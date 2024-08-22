import React, { useState } from 'react';
import { TextField, Chip, Stack, Box } from '@mui/material';

function TagsInput() {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleAddTag = (event) => {
    if (event.key === 'Enter' && inputValue.trim()) {
      setTags([...tags, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter(tag => tag !== tagToDelete));
  };

  return (
    <Stack spacing={1} direction="row" flexWrap="wrap" display={'flex'} marginTop={'8px'} width={'400px'} border={'1px solid'} height={'53px'} alignItems={'center'} padding={'5px'}>
      {tags.map((tag, index) => (
        <Chip
          key={index}
          label={tag}
          onDelete={() => handleDeleteTag(tag)}
          color="primary"
          variant="outlined"
        />
      ))}
      <TextField
        sx={{
          '& .MuiInputBase-root': {
            border: 'none',
            borderRadius: '0px',
            boxShadow: 'none',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
          '& .MuiInputBase-input': {
            padding: '0px', // Adjust padding if needed
          },
        }}
        placeholder='Enter tags'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleAddTag}
        fullWidth
      />
    </Stack>
  );
}

export default TagsInput;
