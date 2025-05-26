import React from 'react';
import { Button } from 'react-bootstrap';
import { useBooks } from '../context/BookContext';
import BookList from '../components/BookList';
import { Navigate, useNavigate } from 'react-router-dom';

const BrowsePage = () => {
  const { user, selectedBooks, logout } = useBooks();
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Browse Books</h2>
        <div>
          <Button 
            variant="outline-primary" 
            onClick={() => navigate('/checkout')}
            disabled={selectedBooks.length === 0}
            className="me-2"
          >
            Checkout ({selectedBooks.length})
          </Button>
          <Button variant="outline-danger" onClick={logout}>
            Logout
          </Button>
        </div>
      </div>
      <BookList />
    </div>
  );
};

export default BrowsePage;