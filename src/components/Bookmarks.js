import React from 'react';

const Bookmarks = ({ bookmarks, onSelectChapter }) => {
  return (
    <div>
      <h2>Bookmarks</h2>
      {bookmarks.length === 0 ? (
        <p>No bookmarks found.</p>
      ) : (
        bookmarks.map(chapterId => (
          <div key={chapterId}>
            <button onClick={() => onSelectChapter(chapterId)}>Chapter {chapterId}</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Bookmarks;
