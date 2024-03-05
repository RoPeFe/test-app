import React, { useState, useEffect } from 'react';
import './Pagination.css'

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  const [displayedPages, setDisplayedPages] = useState<number[]>([]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  const handlePrevious = () => {
    handlePageChange(currentPage - 1);
  };

  const handleNext = () => {
    handlePageChange(currentPage + 1);
  };

  useEffect(() => {
    const pagesToShow = 3;
    let start = currentPage - pagesToShow;
    let end = currentPage + pagesToShow;

    if (start < 1) {
      end += Math.abs(start) + 1;
      start = 1;
    }

    if (end > totalPages) {
      end = totalPages;
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    setDisplayedPages(pages);
  }, [currentPage, totalPages]);

  return (
    <div className='pagination'>
      {currentPage > 1 ?
        <button onClick={handlePrevious}>
          &lt;
        </button> : null}
      {displayedPages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={currentPage === page ? 'active' : ''}
        >
          {page}
        </button>
      ))}
      {currentPage < totalPages ?
        <button onClick={handleNext}>
          &gt;
        </button> : null}
    </div>
  );
};

export default Pagination;
