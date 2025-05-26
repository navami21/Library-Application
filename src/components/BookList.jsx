import React, { useEffect } from 'react';
import { Row, Col, Spinner, Alert } from 'react-bootstrap';
import BookCard from './BookCard';
import axios from 'axios';
import { useBooks } from '../context/BookContext';

const BookList = () => {
  const { selectedCategories, books, setBooks, selectedBooks, addToSelectedBooks } = useBooks();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://gutendex.com/books');
        const filteredBooks = response.data.results.filter(book => 
          book.subjects?.some(subject => selectedCategories.includes(subject))
        );
        setBooks(filteredBooks);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    if (selectedCategories.length > 0) {
      fetchBooks();
    }
  }, [selectedCategories, setBooks]);

  if (books.length === 0) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Row>
      {books.map((book) => (
        <Col key={book.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
          <BookCard 
            book={book} 
            isSelected={selectedBooks.some(b => b.id === book.id)}
            onSelect={() => addToSelectedBooks(book)}
          />
        </Col>
      ))}
    </Row>
  );
};

export default BookList;