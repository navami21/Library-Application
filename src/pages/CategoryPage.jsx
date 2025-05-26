import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useBooks } from '../context/BookContext';
import CategorySelector from '../components/CategorySelector';
import { Button } from 'react-bootstrap';

const CategoryPage = () => {
  const { user, setSelectedCategories,logout } = useBooks();
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/" />;
  }

  const handleCategoriesSelected = (categories) => {
    setSelectedCategories(categories);
    navigate('/browse');
  };

  return (
    <div className="container mt-4">
      
      <div className='d-flex justify-content-between align-items-center mb-3'>
      <h2>Welcome, {user.email}</h2>
        <Button variant="outline-danger" onClick={logout}>
            Logout
          </Button>
          </div>
      <CategorySelector onCategoriesSelected={handleCategoriesSelected} />
    </div>
  );
};
export default CategoryPage