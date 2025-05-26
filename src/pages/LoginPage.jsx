import React, { useState } from 'react'
import { useBooks } from '../context/BookContext'
import {  useNavigate } from 'react-router-dom'
import { Button, Card, Container, Form } from 'react-bootstrap';

const LoginPage = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const {login}=useBooks()
    const navigate=useNavigate()

    const handleSubmit=(e)=>{
       e.preventDefault() ;
       const success=login(email,password)
       if(success){

       navigate('/categories')
       }
       else{
        alert('Invalid credentials!!')
       }
    }
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
    <Card style={{ width: '100%', maxWidth: '400px' }}>
      <Card.Body>
        <h2 className="text-center mb-4">Login</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit" className="w-100">
            Login
          </Button>
        </Form>
      </Card.Body>
    </Card>
  </Container>
);
};
  


export default LoginPage