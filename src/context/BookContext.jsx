import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { createContext } from 'react'

const BookContext = createContext();
export const BookProvider=({children})=>{
    const [user,setUser]=useState(null)
    const [selectedCategories,setSelectedCategories]=useState([])
    const [selectedBooks,setSelectedBooks]=useState([])
    const [books,setBooks]=useState([]);
    const login=(email,password)=>{
        if(email==='navami@gmail.com' && password==='navami123'){
        setUser({email})
        return true;
        }else{
            return false;
        }
    };
    const logout=()=>{
        setUser(null)
        setSelectedCategories([])
        setSelectedBooks([])
        setBooks([])
    }
    const addToSelectedBooks=(book)=>{
        const categoryCount=selectedBooks.filter(b=>
            b.subjects?.some(subject=>
                selectedCategories.includes(subject)).length)
            const sameCategoryCount=selectedBooks.filter(b=>
                b.subjects.some(subject=>
                    book.subjects?.includes(subject)).length)
                if(selectedBooks.length>=5){
                    alert("You can select maximum 5 books ata a time")
                    return;
                }
                if(sameCategoryCount>=3){
                    alert('You can select maximum 3 books from the same category')
                    return
                }
                setSelectedBooks([...selectedBooks,book])
    }
    const removeFormSelectedBooks=(bookId)=>{
        setSelectedBooks(selectedBooks.filter(book=>book.id!==bookId));
    }
    const value={
        user,
        login,
        logout,
        selectedCategories,
        setSelectedCategories,
        selectedBooks,
        addToSelectedBooks,
        removeFormSelectedBooks,
        books,
        setSelectedBooks,
        setBooks
    }
    return<BookContext.Provider value={value}>{children}</BookContext.Provider>
}

export const useBooks=()=>useContext(BookContext)