import type { FilmType, UseFilmsReturn, SearchType } from '../types/types';
import { useEffect, useState, useCallback } from 'react';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

export function useFilms(filmName: string, type: SearchType = 'popular', year: string = ''): UseFilmsReturn {
    const [films, setFilms] = useState<FilmType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchFilms = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            let url = `${BASE_URL}/movie/${type}?api_key=${API_KEY}`;

            if (year) {
                url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&primary_release_year=${year}`;
                
                if (type === 'top_rated') {
                    url += '&sort_by=vote_average.desc';
                } else if (type === 'popular') {
                    url += '&sort_by=popularity.desc';
                } else if (type === 'upcoming') {
                    url += '&sort_by=primary_release_date.desc';
                }
            } else if (type === 'search' && filmName) {
                url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(filmName)}`;
            }

            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            
            if (!result.results) {
                throw new Error('Invalid API response structure');
            }
            
            const fetchedFilms: FilmType[] = result.results.map((film: FilmType) => ({
                id: film.id,
                title: film.title,
                poster_path: film.poster_path,
                release_date: film.release_date,
                overview: film.overview,
                vote_average: film.vote_average,
                vote_count: film.vote_count,
            }));

            setFilms(fetchedFilms);
            
            if (fetchedFilms.length === 0) {
                setError('No se encontraron películas para tu búsqueda.');
            }
        } catch (err) {
            console.error('Error fetching films:', err);
            setError('No se pudieron cargar las películas. Intenta nuevamente.');
            setFilms([]);
        } finally {
            setIsLoading(false);
        }
    }, [filmName, type, year]);

    useEffect(() => {
        fetchFilms();
    }, [fetchFilms]);

    return { films, isLoading, error };
}
