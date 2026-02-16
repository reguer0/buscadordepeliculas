import { useState } from "react";
import type { SearchBarProps } from "../types/types";
import { FILTER_BUTTONS } from "../types/types";
import './searchBarStyle.css';

export function FilmSearchBar({ 
    onSearch, 
    filterByVotes, 
    onFilterChange, 
    onYearChange, 
    selectedYear
}: SearchBarProps) {
    const [inputValue, setInputValue] = useState('');
    const [ascending, setAscending] = useState(true);

    const years = Array.from({ length: 2024 - 1950 + 1 }, (_, i) => 1950 + i).reverse();

    const handleSortToggle = () => {
        const newAscending = !ascending;
        setAscending(newAscending);
        filterByVotes(newAscending);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            onSearch(inputValue);
        }
    };

    return (
        <div className="search-bar-container">
            <div className="search-input-group">
                <input 
                    className="search-input"
                    type="text" 
                    placeholder="Buscar películas..." 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)} 
                    onKeyDown={handleKeyDown}
                />
                <button className="btn btn-primary" onClick={() => onSearch(inputValue)}>
                    Buscar
                </button>
            </div>            
         
            <div className="filter-tabs">
                {FILTER_BUTTONS.map((btn) => (
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
                <div className="year-filter">
                    <select 
                        value={selectedYear} 
                        onChange={(e) => onYearChange(e.target.value)}
                        className="year-select"
                    >
                        <option value="">Todos los años</option>
                        {years.map(year => (
                            <option key={year} value={year.toString()}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
                <button className="btn btn-secondary" onClick={handleSortToggle}>
                    Ordenar por Rating <span className="sort-indicator">{ascending ? '▲' : '▼'}</span>
                </button>
            </div>
        </div>
    );
}
