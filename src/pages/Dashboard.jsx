import React, { useState, useEffect } from 'react';
import { fetchBooks } from '../api/booksApi';
import BookTable from '../components/BookTable';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const loadBooks = async () => {
      const data = await fetchBooks('', currentPage + 1, pageSize); // Fetch all books
      setBooks(data.docs);
      setPageCount(Math.ceil(data.num_found / pageSize));
    };
    loadBooks();
  }, [currentPage, pageSize]);

  const handlePageChange = (selected) => {
    setCurrentPage(selected.selected);
  };

  const handleSearch = (author) => {
    // No need to set author state when fetching all books
    const loadBooks = async () => {
      const data = await fetchBooks(author, currentPage + 1, pageSize); // Fetch books by author
      setBooks(data.docs);
      setPageCount(Math.ceil(data.num_found / pageSize));
    };
    
    setCurrentPage(0);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
  };

  return (
    <div className="container mx-auto p-4">
      <SearchBar onSearch={handleSearch} />
      <div className="flex justify-between items-center mb-4">
        <label className="flex items-center">
          Show 
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
            className="mx-2 border rounded px-2 py-1"
          >
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select> 
          records per page
        </label>
      </div>
      <BookTable data={books} />
      <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
    </div>
  );
};

export default Dashboard;
