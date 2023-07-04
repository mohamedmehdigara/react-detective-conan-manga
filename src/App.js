import React, { useState } from 'react';
import MangaList from './components/MangaList';
import ChapterList from './components/ChapterList';
import MangaViewer from './components/MangaViewer';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Bookmarks from './components/Bookmarks';
import './App.css';

const App = () => {
  const [selectedManga, setSelectedManga] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  const handleMangaSelect = (mangaId) => {
    setSelectedManga(mangaId);
    setSelectedChapter(null);
  };

  const handleChapterSelect = (chapterId) => {
    setSelectedChapter(chapterId);
  };

  const handleSearch = (query) => {
    // Call your API endpoint with the search query and update the search results
    // Example:
    // fetchSearchResults(query)
    //   .then(data => setSearchResults(data.results))
    //   .catch(error => console.error('Error fetching search results:', error));
  };

  const handleBookmarkToggle = (chapterId) => {
    // Check if the chapter is already bookmarked
    const isBookmarked = bookmarks.includes(chapterId);
    
    if (isBookmarked) {
      // Remove the chapter from bookmarks
      setBookmarks(bookmarks.filter(id => id !== chapterId));
    } else {
      // Add the chapter to bookmarks
      setBookmarks([...bookmarks, chapterId]);
    }
  };

  return (
    <div>
      <h1>Detective Conan Manga</h1>
      <SearchBar onSearch={handleSearch} />
      <MangaList onSelectManga={handleMangaSelect} />
      {selectedManga && (
        <ChapterList
          mangaId={selectedManga}
          onSelectChapter={handleChapterSelect}
          onBookmarkToggle={handleBookmarkToggle}
          bookmarks={bookmarks}
        />
      )}
      {searchResults.length > 0 && (
        <SearchResults
          results={searchResults}
          onSelectChapter={handleChapterSelect}
          onBookmarkToggle={handleBookmarkToggle}
          bookmarks={bookmarks}
        />
      )}
      {selectedChapter && <MangaViewer chapterId={selectedChapter} />}
      <Bookmarks
        bookmarks={bookmarks}
        onSelectChapter={handleChapterSelect}
      />
    </div>
  );
};

export default App;
