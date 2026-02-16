import { useMemo } from 'react';
import type { ActiveFiltersProps, SearchType } from '../types/types';
import './activeFilters.css';

const FILTER_LABELS: Record<SearchType, string> = {
    popular: '🔥🔥Populares',
    top_rated: '⭐⭐Mejor valoradas',
    upcoming: '🎬🎬Próximos estrenos',
    search: ''
};

export function ActiveFilters({ filmName, searchType, filmInfo, selectedYear }: ActiveFiltersProps) {
    const activeFilterLabel = useMemo(() => {
        if (searchType === 'search' && filmName) {
            return `🔍 ${filmName}`;
        }
        return FILTER_LABELS[searchType] || '';
    }, [searchType, filmName]);

    return (
        <div className="active-filters">
            <div>
                {activeFilterLabel && (
                    <span className="filter-label">Filtrando: {activeFilterLabel}</span> 
                )}
            </div>            
            <div>
                {selectedYear && (
                    <span className="filter-label">Año: {selectedYear}</span> 
                )}
            </div>
          
            <div className="results-count">
                <span className="count-label">Resultados: {filmInfo.length}</span>               
            </div>
        </div>
    );
}
