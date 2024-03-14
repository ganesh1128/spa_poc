import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import './App.css';
import { useSelector } from 'react-redux';
import Test from './Pages/Test';
import ResponsiveAppBar from './Comonents/TopNavBar';
import Logos from './Pages/Logos/Logos';
import { Box } from '@mui/material';

function App() {
  return (
    <BrowserRouter>
    <Box>
    <ResponsiveAppBar />
    <Box height={20} />
    <Routes>
      <Route path="/test" element={<Test />} />
      <Route path="/" element={<Logos />} />
    </Routes>
    </Box>
  </BrowserRouter>
  );
}

export default App;
