
import { useEffect ,useState} from 'react';


const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL ;

//TODO: crear como custom hook, y manejar errrores
interface TrailerData {
 results: Array<{
    id: string;
    key: string;
    name: string;
    site: string;
    type: string;
 }>;
}

export function useTrailer(filmId: number | null) {
 const [trailerInfo, setTrailerInfo] = useState<TrailerData | null>(null);
 
 const [error, setError] = useState<string | null>(null);

    useEffect(() => {   
        if (!filmId) return;

        const getApiData = async (id: number) => {          
            try {               
                setError(null);
                const url =  `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`;
                const response = await fetch(url);                 
                if (!response.ok) throw new Error('Failed to fetch trailer');
                const result = await response.json();              
                setTrailerInfo(result);  
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } 
               
            
        }; 
        
        getApiData(filmId);
    }, [filmId]);  

    return { trailerInfo, error };
}