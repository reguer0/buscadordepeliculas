
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import { FilmSearchBar } from './components/filmSearchBar';
import { FilmCard } from './components/filmCard';
import { useFilms } from './hooks/useFilms';
import { ErrorCard } from './components/errorCard';
import { ActiveFilters } from './components/activeFilters';
import { FilmDetail } from './components/filmDetail';

function App() {
  const [filmName, setFilmName] = useState('');
  const [searchType, setSearchType] = useState('popular');
  const [selectedYear, setSelectedYear] = useState('');
  const { filmInfo, setFilmInfo, error } = useFilms(filmName, searchType, selectedYear);

  const onsearch = (name: string) => {
    setSelectedYear('');
    if (name) {
      setFilmName(name);
      setSearchType('search');
    } else {
      setSearchType('popular');
    }
  }

  const handleFilterChange = (newType: string) => {
    setSearchType(newType);
  };

  const filterByVotes = (ascending: boolean) => {
    const sortedFilms = [...filmInfo].sort((a, b) => 
      ascending ? a.vote_average - b.vote_average : b.vote_average - a.vote_average
    );
    setFilmInfo(sortedFilms);
  }

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <h1>Buscador de Peliculas</h1>
            <FilmSearchBar onSearch={onsearch} filterByVotes={filterByVotes} onFilterChange={handleFilterChange} onYearChange={handleYearChange} selectedYear={selectedYear} />       
            <ActiveFilters filmName={filmName} searchType={searchType} filmInfo={filmInfo} selectedYear={selectedYear}/>       
            <div className="films-container">
              {error 
              ? (<ErrorCard error={error} />)
             :  (filmInfo.map((film) => (
                  <FilmCard key={film.id} {...film} />
                )))
              }
            </div>
          </>
        } />
        <Route path="/film/:id" element={<FilmDetail />} />
      </Routes>
    </Router>
  )
}

export default App
