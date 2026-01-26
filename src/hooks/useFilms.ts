import type { FilmType } from '../types/types';
import { useEffect, useState } from 'react';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL ;

//TODO: crear como custom hook, y manejar errrores
export function useFilms(filmName: string , type: string = 'popular', year: string = '') {
    const [filmInfo, setfilmInfo] = useState<FilmType[]>([]);
    const [error, setError] = useState<string | null>(null); 
 
    useEffect(() => {   
        const getApiData = async (query: string) => {   
            setError(null); // Reset error antes de nueva petición
            try {
                let url = `${BASE_URL}/movie/${type}?api_key=${API_KEY}`;

                if (year) {
                    // Usar discover/movie cuando hay filtro por año
                    url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&primary_release_year=${year}`;
                    
                    // Añadir criterio de ordenamiento según el tipo
                    if (type === 'top_rated') {
                        url += '&sort_by=vote_average.desc';
                    } else if (type === 'popular') {
                        url += '&sort_by=popularity.desc';
                    } else if (type === 'upcoming') {
                        url += '&sort_by=primary_release_date.desc';
                    }
                } else if (type === 'search' && query) {
                    url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
                }

                const response = await fetch(url);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const result = await response.json();
                
                if (!result.results) {
                    throw new Error('Invalid API response structure');
                }
                
                const films : FilmType[] = result.results
                    .map((film: FilmType) => ({
                        id:film.id,
                            title: film.title,
                            poster_path: film.poster_path,
                            release_date: film.release_date,
                            overview: film.overview,
                            vote_average: film.vote_average,
                            vote_count: film.vote_count,
                    }));

                setfilmInfo(films );
                
                // Mostrar mensaje si no hay resultados
                if (films.length === 0) {
                    setError('No se encontraron películas para tu búsqueda.');
                }
            } catch (error) {
                console.error('Error fetching films:', error);
                setError('No se pudieron cargar las películas. Intenta nuevamente.');
                setfilmInfo([]);
            }
        }; 
        
        getApiData(filmName);
    }, [filmName, type, year]);  

    return { filmInfo, setFilmInfo: setfilmInfo, error };
}