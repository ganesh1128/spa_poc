import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import './App.css';
import ResponsiveAppBar from './Comonents/TopNavBar';
import Logos from './Pages/Logos/Logos';
import { Box } from '@mui/material';
import DetailsPage from './Pages/DetailPage';
import Home from './Pages/Home';

function App() {
  return (
    <BrowserRouter>
    <Box>
    <ResponsiveAppBar />
    <Box height={20} />
    <Routes>
      <Route path="/" element={<Logos />} />
      <Route path="/details/:id" element={<DetailsPage/>} />
      <Route path="/home" element={<Home/>} />
    </Routes>
    </Box>
  </BrowserRouter>
  );
}

export default App;
