

import './providers.css';

const getProviderUrl = (provider: any, movieTitle: string) => {
    const encodedTitle = encodeURIComponent((movieTitle || '').toLowerCase());    
    // URLs de búsqueda específicas para cada plataforma
    const providerName = provider.provider_name?.toLowerCase() || '';
    const providerUrls: { [key: string]: string } = {
        'amazon prime video': `https://www.primevideo.com/search/?phrase=${encodedTitle}`,
        'netflix': `https://www.netflix.com/search?q=${encodedTitle}`,
        'disney plus': `https://www.disneyplus.com/search?q=${encodedTitle}`,
        'hulu': `https://www.hulu.com/search?q=${encodedTitle}`,
        'apple tv': `https://tv.apple.com/search?term=${encodedTitle}`,
        'google play movies': `https://play.google.com/store/search?q=${encodedTitle}&c=movies`,
        'max': `https://www.max.com/search?q=${encodedTitle}`,
        'paramount plus': `https://www.paramountplus.com/search?q=${encodedTitle}`,
        'peacock': `https://www.peacocktv.com/search?q=${encodedTitle}`,
        'amazon video': `https://www.amazon.com/gp/video/search/${encodedTitle}`,
        'rakuten': `https://www.rakuten.tv/es/search?q=${encodedTitle}`,
    };
    
    const match = Object.keys(providerUrls).find(key => providerName.includes(key));
    return match ? providerUrls[match] : null;
};

export function Providers({ watchProviders, movieTitle }: { watchProviders: any, movieTitle: string }) {
  
        return (
        <div>
           
           <section className="providers-section">            
            {watchProviders && Object.keys(watchProviders).map((provider) => {                   
                    const providerArray = watchProviders[provider];
                    if(Array.isArray(providerArray)) {
                        return (
                            <div key={provider}>
                                <h3>{provider.toUpperCase()}</h3>
                                <ul>
                                    {providerArray.length>0 && providerArray.map((p: any) => {
                                        const url = getProviderUrl(p, movieTitle);
                                        return url ? 
                                        <li>
                                            <a key={p.provider_id} href={url} target="_blank" rel="noopener noreferrer">Ver en {p.provider_name}</a>
                                        </li>
                                            : null;
                                    })}
                                </ul>
                            </div>
                        )
                    }
                    return null;
                })
            }           
           
   
           </section>
          
            
        </div>
    );
}