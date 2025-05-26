import React from 'react';
import { Button, Card, Container, ListGroup, Alert } from 'react-bootstrap';
import { useBooks } from '../context/BookContext';
import { useNavigate } from 'react-router-dom';

const CheckOutPage = () => {
  const { selectedBooks, setSelectedBooks } = useBooks();
  const navigate = useNavigate();

  const handleCheckout = () => {
    alert('Checkout successful!');
    setSelectedBooks([]);
    navigate('/categories');
  };

  const categoryCounts = {};
  selectedBooks.forEach(book => {
    book.subjects?.forEach(subject => {
      categoryCounts[subject] = (categoryCounts[subject] || 0) + 1;
    });
  });

  const isValidCheckout = selectedBooks.length > 0 && 
                         selectedBooks.length <= 5 && 
                         !Object.values(categoryCounts).some(count => count > 3);

  return (
    <Container className="mt-4">
      <h2>Checkout</h2>
      {!isValidCheckout && (
        <Alert variant="danger">
          You can checkout maximum 5 books with no more than 3 from the same category.
        </Alert>
      )}
      
      <ListGroup className="mb-3">
        {selectedBooks.map(book => (
          <ListGroup.Item key={book.id}>
            {book.title} by {book.authors?.map(author => author.name).join(', ')}
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Button 
        variant="success" 
        onClick={handleCheckout}
        disabled={!isValidCheckout}
      >
        Complete Checkout
      </Button>
    </Container>
  );
};

export default CheckOutPage;