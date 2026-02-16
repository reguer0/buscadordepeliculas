
import { useEffect, useState } from 'react';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

export function useDetails(filmId: number | null) {      
    const [data, setData] = useState<any>(null);
       useEffect(() => {
        if (!filmId) return;

        const fetchMovieDetails = async () => {
            try {
                const response = await fetch( `${BASE_URL}/movie/${filmId}?api_key=${API_KEY}&language=es-ES&append_to_response=credits`);
                if (!response.ok) throw new Error('Failed to fetch movie details');
                const data = await response.json();
                console.log('Movie details:', data);
                setData(data);
            } catch (err) {
                console.error('Error fetching movie details:', err);
            }
        };

        fetchMovieDetails();
    }, [filmId]);
    return {data};
}