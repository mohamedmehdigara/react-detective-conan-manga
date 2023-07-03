import React, { useState, useEffect } from 'react';
import { fetchMangaTitles } from '../api';

const MangaList = () => {
  const [mangaTitles, setMangaTitles] = useState([]);

  useEffect(() => {
    // Fetch manga titles from the API
    fetchMangaTitles()
      .then(response => {
        setMangaTitles(response.data);
      })
      .catch(error => {
        console.error('Error fetching manga titles:', error);
      });
  }, []);

  return (
    <div>
      <h2>Manga Titles</h2>
      <ul>
        {mangaTitles.map(manga => (
          <li key={manga.id}>{manga.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default MangaList;
