import React from 'react';

const SearchResults = ({ results, onSelectChapter, onBookmarkToggle, bookmarks }) => {
  return (
    <div>
      <h2>Search Results</h2>
      {results.map(result => (
        <div key={result.id}>
          <p>{result.title}</p>
          <button onClick={() => onSelectChapter(result.chapterId)}>Read</button>
          <button
            onClick={() => onBookmarkToggle(result.chapterId)}
            className={bookmarks.includes(result.chapterId) ? 'bookmarked' : ''}
          >
            Bookmark
          </button>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
