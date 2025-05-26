import React from 'react'
import { useBooks } from '../context/BookContext'
import { Container } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';

const CustomNavbar = () => {
    const {user}=useBooks();
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          Book Library
        </Navbar.Brand>
        {user && (
          <Navbar.Text className="justify-content-end">
            Welcome!
          </Navbar.Text>
          
        )}

      </Container>
    </Navbar>
    )
}

export default CustomNavbar