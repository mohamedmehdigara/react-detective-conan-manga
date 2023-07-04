import React, { useEffect, useState } from 'react';
import { fetchChapters } from '../api';

const ChapterList = ({ mangaId, onSelectChapter }) => {
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    if (mangaId) {
      fetchChapters(mangaId)
        .then(response => {
          setChapters(response);
        })
        .catch(error => {
          console.error('Error fetching chapters:', error);
        });
    }
  }, [mangaId]);

  return (
    <div>
      <h2>Chapters</h2>
      <ul>
        {chapters.map(chapter => (
          <li key={chapter.id} onClick={() => onSelectChapter(chapter.id)}>
            Chapter {chapter.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChapterList;
