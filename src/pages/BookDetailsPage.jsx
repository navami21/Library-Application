import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Container, ListGroup, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useBooks } from '../context/BookContext';
import { Alert } from 'react-bootstrap';

const BookDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedBooks, addToSelectedBooks, removeFromSelectedBooks } = useBooks();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`https://gutendex.com/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  const isSelected = selectedBooks.some(b => b.id === parseInt(id));

  const handleToggleSelection = () => {
    if (isSelected) {
      removeFromSelectedBooks(parseInt(id));
    } else {
      addToSelectedBooks(book);
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!book) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">Book not found</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Button variant="outline-secondary" onClick={() => navigate(-1)} className="mb-3">
        Back to Browse
      </Button>
      
      <Card>
        <Card.Img 
          variant="top" 
          src={book.formats['image/jpeg'] || book.formats['image/png'] || 'https://via.placeholder.com/300'} 
          style={{ maxHeight: '400px', objectFit: 'contain' }}
        />
        <Card.Body>
          <Card.Title>{book.title}</Card.Title>
          <Card.Text>
            {book.authors?.map(author => author.name).join(', ')}
          </Card.Text>
          
          <ListGroup className="mb-3">
            <ListGroup.Item>
              <strong>Subjects:</strong> {book.subjects?.join(', ') || 'N/A'}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Languages:</strong> {book.languages?.join(', ') || 'N/A'}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Download Count:</strong> {book.download_count || 0}
            </ListGroup.Item>
          </ListGroup>

          <Button 
            variant={isSelected ? 'success' : 'primary'} 
            onClick={handleToggleSelection}
          >
            {isSelected ? 'Remove from Selection' : 'Add to Selection'}
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BookDetailsPage;