import React, { useState, useEffect } from 'react';
import { fetchPages } from '../api';

const MangaViewer = ({ chapterId }) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    // Fetch manga pages for the selected chapter from the API
    fetchPages(chapterId)
      .then(response => {
        setPages(response.data);
      })
      .catch(error => {
        console.error('Error fetching manga pages:', error);
      });
  }, [chapterId]);

  return (
    <div>
      <h2>Manga Viewer</h2>
      {pages.map(page => (
        <img key={page.id} src={page.url} alt={`Page ${page.id}`} />
      ))}
    </div>
  );
};

export default MangaViewer;
