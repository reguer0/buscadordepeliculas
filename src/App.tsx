import { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { FilmSearchBar } from './components/filmSearchBar';
import { FilmCard } from './components/filmCard';
import { useFilms } from './hooks/useFilms';
import { ErrorCard } from './components/errorCard';
import { ActiveFilters } from './components/activeFilters';
import { FilmDetail } from './components/filmDetail';
import type { FilmType, SearchType } from './types/types';

function App() {
  const [filmName, setFilmName] = useState('');
  const [searchType, setSearchType] = useState<SearchType>('popular');
  const [selectedYear, setSelectedYear] = useState('');
  const [sortAscending, setSortAscending] = useState(true);
  const [movieorTv, setMovieorTv] = useState('movie');
  const { films, isLoading, error } = useFilms(filmName, searchType, selectedYear, movieorTv);

  const sortedFilms = useMemo(() => {
    return [...films].sort((a, b) => 
      sortAscending 
        ? a.vote_average - b.vote_average 
        : b.vote_average - a.vote_average
    );
  }, [films, sortAscending]);

  const handleSearch = (name: string) => {
    setSelectedYear('');
    if (name) {
      setFilmName(name);
      setSearchType('search');
    } else {
      setFilmName('');
      setSearchType('popular');
    }
  };

  const handleFilterChange = (newType: SearchType) => {
    setSearchType(newType);
    setFilmName('');
  };

  const handleSortByVotes = (ascending: boolean) => {
    setSortAscending(ascending);
  };

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <div className="movie-tv-selector">
              <button 
                className={`selector-btn ${movieorTv === 'movie' ? 'active' : ''}`}
                onClick={() => setMovieorTv('movie')}
              >
                Películas
              </button>
              <button 
                className={`selector-btn ${movieorTv === 'tv' ? 'active' : ''}`}
                onClick={() => setMovieorTv('tv')}
              >
                Series
              </button>
            </div>
            <FilmSearchBar 
              onSearch={handleSearch} 
              filterByVotes={handleSortByVotes} 
              onFilterChange={handleFilterChange} 
              onYearChange={handleYearChange} 
              selectedYear={selectedYear} 
            />       
            <ActiveFilters 
              filmName={filmName} 
              searchType={searchType} 
              filmInfo={sortedFilms} 
              selectedYear={selectedYear}
            />       
            <div className="films-container">
              {isLoading ? (
                <p>Cargando...</p>
              ) : error ? (
                <ErrorCard error={error} />
              ) : (
                sortedFilms.map((film: FilmType) => (
                  <FilmCard key={film.id} {...film} movieorTv={movieorTv} />
                ))
              )}
            </div>
          </>
        } />
        <Route path="/film/:id/:movieorTv" element={<FilmDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
