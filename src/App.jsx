import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import LoginPage from './pages/LoginPage';
import CategoryPage from './pages/CategoryPage';
import BrowsePage from './pages/BrowsePage';
import BookDetailsPage from './pages/BookDetailsPage';
import CheckOutPage from './pages/CheckOutPage';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import CustomNavbar from './components/Navbar';

const App = () => {
  return (
    <BookProvider>
      
        <CustomNavbar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/book/:id" element={<BookDetailsPage />} />
          <Route path="/checkout" element={<CheckOutPage />} />
        </Routes>
      
    </BookProvider>
  );
};

export default App;
