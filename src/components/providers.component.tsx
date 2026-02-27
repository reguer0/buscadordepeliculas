
import './providers.css';
import type { Provider, WatchProviders } from '../types/types';

const getProviderUrl = (provider: Provider, movieTitle: string) => {
    const encodedTitle = encodeURIComponent((movieTitle || '').toLowerCase());    
    // URLs de búsqueda específicas para cada plataforma
    const providerName = provider.provider_name?.toLowerCase() || '';
    const providerUrls: { [key: string]: string } = {
        'amazon prime video': `https://www.primevideo.com/search/?phrase=${encodedTitle}`,
        'netflix': `https://www.netflix.com/search?q=${encodedTitle}`,
        'disney plus': `https://www.disneyplus.com/search?${encodedTitle}`,
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

export function Providers({ watchProviders, movieTitle }: { watchProviders: WatchProviders; movieTitle: string | undefined }) {
    const getProviderList = (): Array<{ type: string; provider: Provider }> => {
        const countryData = watchProviders['ES'] || watchProviders['US'];
        if (!countryData) return [];
        
        const providers: Array<{ type: string; provider: Provider }> = [];
        const addedIds = new Set<number>();
        
        const addProviders = (list: Provider[] | undefined, type: string) => {
            if (!list) return;
            list.forEach(p => {
                if (!addedIds.has(p.provider_id)) {
                    addedIds.add(p.provider_id);
                    providers.push({ type, provider: p });
                }
            });
        };
        
        addProviders(countryData.flatrate, 'Streaming');
        addProviders(countryData.rent, 'Alquiler');
        addProviders(countryData.buy, 'Compra');
        
        return providers;
    };

    const providerList = getProviderList();

    return (
        <div>
            <section className="providers-section">            
                {providerList.length > 0 ? (
                    <div>
                        <h3>Dónde ver</h3>
                        <ul>
                            {providerList.map((item, index) => {
                                const url = getProviderUrl(item.provider, movieTitle || '');
                                return url ? (
                                    <li key={`${item.provider.provider_id}-${index}`}>
                                        <a href={url} target="_blank" rel="noopener noreferrer">
                                            {item.type}: {item.provider.provider_name}
                                        </a>
                                    </li>
                                ) : null;
                            })}
                        </ul>
                    </div>
                ) : (
                    <p>No hay información de proveedores disponible</p>
                )}
            </section>
        </div>
    );
}