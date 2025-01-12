import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import BottomNavbar from './components/BottomNavbar';
import Home from './pages/Home';
import Wallet from './pages/Wallet'; 
import Horoscope from './pages/Horoscope'; 
import Friends from './pages/Friends'; 
import Tasks from './pages/Tasks'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/horoscope" element={<Horoscope />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/" element={<Navigate to="/horoscope" />} />
      </Routes>
      <BottomNavbar />
    </Router>
  );
};

export default App;