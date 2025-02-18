// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AccommodationDetailPage from './pages/AccommodationDetailPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AccommodationDetailPage />} />
            </Routes>
        </Router>
    );
}

export default App;