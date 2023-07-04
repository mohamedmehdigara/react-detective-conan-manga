import React, { useState, useEffect } from 'react';
import { fetchPages } from '../api';

const MangaViewer = ({ chapterId }) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    fetchPages(chapterId)
      .then(response => {
        setPages(response);
      })
      .catch(error => {
        console.error('Error fetching manga pages:', error);
      });
  }, [chapterId]);

  return (
    <div className="manga-viewer">
      <h2>Manga Viewer</h2>
      {pages.map((page, index) => (
        <img key={index} src={page.imageUrl} alt={`Page ${index + 1}`} />
      ))}
    </div>
  );
};

export default MangaViewer;
