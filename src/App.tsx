import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import './App.css';
import { useSelector } from 'react-redux';
import Test from './Pages/Test';
import ResponsiveAppBar from './Comonents/TopNavBar';

function App() {
  return (
    <BrowserRouter>
    <div>
    <ResponsiveAppBar />
    <Routes>
      <Route path="/test" element={<Test />} />
    </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;
