import { useEffect, useState } from 'react';
import type { ProviderData, UseProvidersReturn } from '../types/types';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

export function useProviders(filmId: number | null, movieorTv?: string): UseProvidersReturn {
    const [providerInfo, setProviderInfo] = useState<ProviderData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!filmId) return;

        const fetchProviders = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const type = movieorTv || 'movie';
                const url = `${BASE_URL}/${type}/${filmId}/watch/providers?api_key=${API_KEY}`;
                const response = await fetch(url);
                
                if (!response.ok) throw new Error('Failed to fetch providers');
                
                const result = await response.json();
                setProviderInfo(result);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProviders();
    }, [filmId, movieorTv]);

    return { providerInfo, isLoading, error };
}
