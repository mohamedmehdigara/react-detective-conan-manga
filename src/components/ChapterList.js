import React, { useState, useEffect } from 'react';
import { fetchChapters } from '../api';

const ChapterList = ({ mangaId }) => {
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    // Fetch chapters for the selected manga from the API
    fetchChapters(mangaId)
      .then(response => {
        setChapters(response.data);
      })
      .catch(error => {
        console.error('Error fetching chapters:', error);
      });
  }, [mangaId]);

  return (
    <div>
      <h2>Chapters</h2>
      <ul>
        {chapters.map(chapter => (
          <li key={chapter.id}>{chapter.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChapterList;
