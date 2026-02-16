import { useEffect, useState } from 'react';
import type { MovieDetails, UseDetailsReturn } from '../types/types';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

export function useDetails(filmId: number | null): UseDetailsReturn {
    const [data, setData] = useState<MovieDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!filmId) return;

        const fetchMovieDetails = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `${BASE_URL}/movie/${filmId}?api_key=${API_KEY}&language=es-ES&append_to_response=credits`
                );
                
                if (!response.ok) throw new Error('Failed to fetch movie details');
                
                const movieData = await response.json();
                setData(movieData);
            } catch (err) {
                console.error('Error fetching movie details:', err);
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovieDetails();
    }, [filmId]);

    return { data, isLoading, error };
}
