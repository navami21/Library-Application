import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Form } from 'react-bootstrap'


const CategorySelector = ({onCategoriesSelected}) => {
    const [categories,setCategories]=useState([])
    const [selected,setSelected]=useState([])
    useEffect(()=>{
        const fetchCategories=async()=>{
            try{
                const response=await axios.get('https://gutendex.com/books')
                const allSubjects=response.data.results.flatMap(book=>book.subjects || [])
                const uniqueSubjects=[...new Set(allSubjects)]
                setCategories(uniqueSubjects)
            } catch(error){
                console.error('Error fetching categories',error)
            }
        }
        fetchCategories()
    },[])
    const handleCategoryToggle=(category)=>{
        if(selected.includes(category)){
            setSelected(selected.filter(c=>c!==category))

        }else{
            setSelected([...selected,category])
        }
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        onCategoriesSelected(selected)
    }

  return (
    <Form onSubmit={handleSubmit}>
    <h4 className="mb-3">Select Categories</h4>
    <Row>
      {categories.map((category) => (
        <Col key={category} xs={12} sm={6} md={4} lg={3}>
          <Form.Check
            type="checkbox"
            id={category}
            label={category}
            checked={selected.includes(category)}
            onChange={() => handleCategoryToggle(category)}
          />
        </Col>
      ))}
    </Row>
    <Button type="submit" className="mt-3" disabled={selected.length === 0}>
      Browse Books
    </Button>
  </Form>
    )
}

export default CategorySelector