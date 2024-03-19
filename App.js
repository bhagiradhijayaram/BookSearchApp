// BookSearch.js

import React, { useState } from 'react';
import './BookSearch.css'; // Import external CSS file

function BookSearch() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (query.toLowerCase() !== 'harry potter') {
        throw new Error('Only Harry Potter books are supported.');
      }
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:harry%20potter`);

      if (!response.ok) {
        throw new Error('Error fetching books');
      }
      const data = await response.json();
      if (!data.items) {
        throw new Error('No books found');
      }

      setBooks(data.items);
      setError(null);
    } catch (error) {
      console.error('Error:', error.message);
      setBooks([]);
      setError(error.message);
    }
  };

  return (
    <>
    <div className='Hero_heading'>
    <h1 className='Main_heading'>Find Your Book of Harry Potter</h1>
    <div className="book-search-container">
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Enter book title"
          className="input-field"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      <marquee className="marquee">Only Harry Potter books are supported.</marquee>
      {error && <div className="error-message">{error}</div>}
    </div>
      <div className="book-container">
        {books.map((book) => (
          <div key={book.id} className="book-item">
            <img
              src={book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail}
              alt={book.volumeInfo.title}
              className="book-image"
            />
            <h3 className="book-title">{book.volumeInfo.title}</h3>
            <p className="book-authors">Authors: {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown'}</p>
            {/* You can add more information about the book here */}
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default BookSearch;
