import { useEffect, useState } from 'react';
import type { TrailerData, UseTrailerReturn } from '../types/types';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

export function useTrailer(filmId: number | null, movieorTv: string): UseTrailerReturn {
    const [trailerInfo, setTrailerInfo] = useState<TrailerData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!filmId) return;

        const fetchTrailer = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const url = `${BASE_URL}/${movieorTv}/${filmId}/videos?api_key=${API_KEY}`;
                const response = await fetch(url);
                
                if (!response.ok) throw new Error('Failed to fetch trailer');
                
                const result = await response.json();
                setTrailerInfo(result);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setIsLoading(false);
            }
        };

        fetchTrailer();
    }, [filmId, movieorTv]);

    return { trailerInfo, isLoading, error };
}
