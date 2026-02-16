import { useEffect, useState } from 'react';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

interface ProviderData {
    results: {
        [country: string]: {
            link?: string;
            flatrate?: Array<{ provider_id: number; provider_name: string; logo_path: string }>;
            rent?: Array<{ provider_id: number; provider_name: string; logo_path: string }>;
            buy?: Array<{ provider_id: number; provider_name: string; logo_path: string }>;
        };
    };
}

interface ProviderDirectLink {
    results: {
        [providerId: string]: string;
    };
}

export function useProviders(filmId: number | null) {
    const [providerInfo, setProviderInfo] = useState<ProviderData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!filmId) return;

        const getApiData = async (id: number) => {
            try {
                setError(null);
                const url = `${BASE_URL}/movie/${id}/watch/providers?api_key=${API_KEY}`;
                const response = await fetch(url);
                if (!response.ok) throw new Error('Failed to fetch providers');
                const result = await response.json();
                setProviderInfo(result);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            }
        };

        getApiData(filmId);
    }, [filmId]);

    return { providerInfo, error };
}