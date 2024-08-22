import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './layout/MainLayout';
import Sidebar from './layout/Sidebar';
import Dashboard from './pages/Dashboard';
import StoryList from './pages/StoryList';
import StoryDetail from './pages/StoryDetail';
import AddStory from './pages/AddStory';
import EditStory from './pages/EditStory';
import AddChapter from './pages/AddChapter';

const AppRoutes = () => {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='stories' element={<StoryList />} />
        <Route path='story/:id' element={<StoryDetail />} />
        <Route path='add-story' element={<AddStory />} />
        <Route path='edit-story/:id' element={<EditStory />} />
        <Route path='add-chapter' element={<AddChapter />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
