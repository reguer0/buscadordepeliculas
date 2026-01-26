import type { FilmType } from '../types/types';
import { useEffect, useState } from 'react';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL ;

//TODO: crear como custom hook, y manejar errrores
export function useFilms(filmName: string , type: string = 'popular') {
    const [filmInfo, setfilmInfo] = useState<FilmType[]>([]);
    const [error, setError] = useState<string | null>(null); 
 
    useEffect(() => {   
        const getApiData = async (query: string) => {   
            setError(null); // Reset error antes de nueva petición
            try {
                let url = `${BASE_URL}/movie/${type}?api_key=${API_KEY}`;

                if (type === 'search' && query) {
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
    }, [filmName, type]);  

    return { filmInfo, setFilmInfo: setfilmInfo, error };
}