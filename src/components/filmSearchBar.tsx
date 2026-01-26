import { useState } from "react";
import type { filterByVotesProps, searchFilmProps, SearchType } from "../types/types";
import './searchBarStyle.css';

export function FilmSearchBar({ onSearch, filterByVotes , onFilterChange}: searchFilmProps & filterByVotesProps & SearchType) {
        const [inputValue, setInputValue] = useState<string>('');
        const [ascending, setAscending] = useState<boolean>(true);
        const filterButtons = [    
            { type: 'popular', label: '🔥 Populares', icon: '🔥' },
            { type: 'top_rated', label: '⭐ Mejor valoradas', icon: '⭐' },
            { type: 'upcoming', label: '🎬 Próximos estrenos', icon: '🎬' }
        ];
        const filter = () =>{
            const newAscending = !ascending;
            setAscending(newAscending);
            filterByVotes(newAscending);
        }
      
    return (
        <div className="search-bar-container">
            <div className="search-input-group">
                <input 
                    className="search-input"
                    type="text" 
                    placeholder="Buscar películas..." 
                    onChange={(e) => setInputValue(e.target.value)} 
                    onKeyPress={(e) => e.key === 'Enter' && onSearch(inputValue)}
                />
                <button className="btn btn-primary" onClick={() => onSearch(inputValue)}>Buscar</button>
            </div>            
            <div className="filter-tabs">
                {filterButtons.map(btn => (
                    <button 
                        key={btn.type}
                      className="btn btn-secondary"
                        onClick={() => onFilterChange(btn.type)}
                    >
                        <span className="tab-icon">{btn.icon}</span>
                        <span className="tab-label">{btn.label}</span>
                    </button>
                ))}
            </div>
            <div className="filter-container">
                <button className="btn btn-secondary" onClick={filter}>
                    Filtrar por Rating <span className="sort-indicator">{ascending ? '▲' : '▼'}</span>
                </button>
            </div>
        </div>
    );
}
