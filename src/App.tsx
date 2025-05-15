import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LibraryPage from './pages/LibraryPage';
import GamePage from './pages/GamePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/game/:id" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;