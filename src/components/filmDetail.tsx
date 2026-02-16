import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Providers } from "./providers.component";
import { useProviders} from "../hooks/useProviders";
import { useDetails } from "../hooks/useDetails";

export function FilmDetail() {
    const { id } = useParams<{ id: string }>();
    const filmId = id ? parseInt(id) : null;  
    const { providerInfo } = useProviders(filmId);   
    const [watchProviders, setWatchProviders] = useState<any>({});  
    const {data} = useDetails(filmId);
    
        useEffect(() => {       
            if(providerInfo?.results['ES']) 
                setWatchProviders(providerInfo?.results['ES']);        
            else 
                setWatchProviders(providerInfo?.results['US']);
        
    }, [providerInfo]);  

    return (
        <div>
            <Providers watchProviders={watchProviders} movieTitle={data?.title } />
          </div>
    );
}
