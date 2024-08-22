import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  Paper,
  Menu,
  MenuItem,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';

const initialChapters = [
  { id: 1, title: 'Introduction', updatedAt: new Date() },
  { id: 2, title: 'Chapter One', updatedAt: new Date() },
  // Add more chapter data as needed
];

function ChaptersTable() {
  const [chapters, setChapters] = useState(initialChapters);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentId, setCurrentId] = useState(null);

  const formatDate = (date) => format(date, 'dd MMMM yyyy');

  const handleMenuClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setCurrentId(id);
    const chapter = chapters.find((chapter) => chapter.id === id);
    if (chapter) {
      setEditTitle(chapter.title);
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentId(null);
  };

  const handleEditAction = () => {
    setEditId(currentId);
    handleMenuClose();
  };

  const handleSaveClick = () => {
    setChapters(
      chapters.map((chapter) =>
        chapter.id === editId ? { ...chapter, title: editTitle } : chapter
      )
    );
    setEditId(null);
    setEditTitle('');
  };

  const handleDeleteAction = () => {
    setChapters(chapters.filter((chapter) => chapter.id !== currentId));
    handleMenuClose();
  };

  const open = Boolean(anchorEl);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Chapter Title</TableCell>
            <TableCell>Last Updated</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {chapters.map((chapter) => (
            <TableRow key={chapter.id}>
              <TableCell>
                {editId === chapter.id ? (
                  <TextField
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onBlur={handleSaveClick}
                    autoFocus
                  />
                ) : (
                  chapter.title
                )}
              </TableCell>
              <TableCell>{formatDate(chapter.updatedAt)}</TableCell>
              <TableCell>
                <IconButton
                  aria-controls='simple-menu'
                  aria-haspopup='true'
                  onClick={(event) => handleMenuClick(event, chapter.id)}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id='simple-menu'
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl) && currentId === chapter.id}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleEditAction}>
                    <EditIcon /> Edit
                  </MenuItem>
                  <MenuItem onClick={handleDeleteAction}>
                    <DeleteIcon /> Delete
                  </MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ChaptersTable;
  