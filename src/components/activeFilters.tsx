import type {activeFiltersProps}  from '../types/types';
import './activeFilters.css';
export function ActiveFilters({ filmName, searchType, filmInfo, selectedYear }: activeFiltersProps) {

        const filterButtons = [    
                { type: 'search', value: filmName },
                { type: 'popular', value: ' 🔥🔥Populares'},
                { type: 'top_rated', value: ' ⭐⭐Mejor valoradas'},
                { type: 'upcoming', value: ' 🎬🎬Próximos estrenos' }
            ];
        const activeFilter =  filterButtons.find(btn => btn.type === searchType);
        


    return (
        <div className="active-filters">
            <div>
                {activeFilter && (
                    <span className="filter-label"> Filtrando : {activeFilter.value}</span> 
                )}
            </div>            
            <div>
                {selectedYear && (
                    <span className="filter-label">  Año: {selectedYear}</span> 
                )}
            </div>
          
            <div className="results-count">
                <span className="count-label">Resultados: {filmInfo.length}</span>               
            </div>
        </div>
    );
}