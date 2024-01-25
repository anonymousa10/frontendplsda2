import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/Landing';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import ThreadDetail from './components/ThreadDetail';
import CreateThread from './components/CreateThread';

const App: React.FC = () => {
 return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/threads/:id" element={<ThreadDetail />} />
        <Route path="/create-thread" element={<CreateThread />} />
      </Routes>
    </Router>
 );
};

export default App;
