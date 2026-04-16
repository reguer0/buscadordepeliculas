
import type { FilmType, UseFilmsReturn, SearchType } from '../types/types';
import { useEffect, useState, useCallback } from 'react';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

export function useFilms(filmName: string, type: SearchType = 'popular', year: string = '', movieorTv: string, page: number = 1): UseFilmsReturn & { totalPages: number; totalResults: number } {
    const [films, setFilms] = useState<FilmType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const fetchFilms = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            let url = `${BASE_URL}/${movieorTv}/${type}?api_key=${API_KEY}&page=${page}`;

            if (year) {
                url = `${BASE_URL}/discover/${movieorTv}?api_key=${API_KEY}&primary_release_year=${year}&page=${page}`;
                
                if (type === 'top_rated') {
                    url += '&sort_by=vote_average.desc';
                } else if (type === 'popular') {
                    url += '&sort_by=popularity.desc';
                } else if (type === 'upcoming') {
                    url += '&sort_by=primary_release_date.desc';
                }
            } else if (type === 'search' && filmName) {
                url = `${BASE_URL}/search/${movieorTv}?api_key=${API_KEY}&query=${encodeURIComponent(filmName)}&page=${page}`;
            }

            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            
            if (!result.results) {
                throw new Error('Invalid API response structure');
            }
            
            const fetchedFilms: FilmType[] = result.results.map((film: any) => ({
                ...film,
                title: film.title || film.name,
                release_date: film.release_date || film.first_air_date,
            }));

            setFilms(fetchedFilms);
            setTotalPages(result.total_pages || 1);
            setTotalResults(result.total_results || 0);
            
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
    }, [filmName, type, year, movieorTv, page]);

    useEffect(() => {
        fetchFilms();
    }, [fetchFilms]);

    return { films, isLoading, error, totalPages, totalResults };
}