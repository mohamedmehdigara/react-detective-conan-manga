import React, { useState } from 'react';
import './VirtualBook.css';

const VirtualBook = ({ chapterId, pages }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = pages.length;
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="virtual-book">
      <div className="page-nav">
        <button className="prev-page" onClick={handlePrevPage}>
          Previous Page
        </button>
        <button className="next-page" onClick={handleNextPage}>
          Next Page
        </button>
      </div>
      <div className="manga-text">
        <p>Text for Manga Page {currentPage + 1}</p>
      </div>
    </div>
  );
};

export default VirtualBook;

