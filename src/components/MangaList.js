import React, { useEffect, useState } from 'react';
import { fetchMangaTitles } from '../api';

const MangaList = ({ onSelectManga }) => {
  const [mangaTitles, setMangaTitles] = useState([]);

  useEffect(() => {
    fetchMangaTitles()
      .then(response => {
        setMangaTitles(response);
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
          <li key={manga.id} onClick={() => onSelectManga(manga.id)}>
            {manga.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MangaList;
