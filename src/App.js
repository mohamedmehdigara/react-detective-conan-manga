import logo from './logo.svg';
import './App.css';
import ChapterList from './components/ChapterList';
import MangaList from './components/MangaList';
import MangaViewer from './components/MangaViewer';

function App() {
  return (
    <div className="App">
      <ChapterList/>
      <MangaList/>
      <MangaViewer/>
         </div>
  );
}

export default App;
