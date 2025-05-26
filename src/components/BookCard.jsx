import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './BookCard.css'

const BookCard = ({ book, isSelected, onSelect }) => {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/book/${book.id}`);
  };

  return (
    <Card  className='book-card' style={{ height: '100%' }}>
      <Card.Img 
        variant="top" 
        src={book.formats['image/jpeg'] || book.formats['image/png'] || 'https://via.placeholder.com/150'} 
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <Card.Body className="card-body d-flex flex-column">
        <Card.Title>{book.title}</Card.Title>
        <Card.Text>
          {book.authors?.map(author => author.name).join(', ')}
        </Card.Text>
        <div className="mt-auto">
          <Button 
            variant={isSelected ? 'success' : 'primary'} 
            onClick={onSelect}
            className="me-2"
          >
            {isSelected ? 'Selected' : 'Select'}
          </Button>
          <Button variant="secondary" onClick={handleDetailsClick}>
            Details
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BookCard;