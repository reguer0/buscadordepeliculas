
import './providers.css';
import type { Provider, WatchProviders } from '../types/types';

const getDirectUrl = (provider: Provider, movieTitle: string) => {
    const encodedTitle = encodeURIComponent(movieTitle || '');
    const providerName = (provider.provider_name || '').toLowerCase();

    const providerUrls: { [key: string]: string } = {
        'netflix': `https://www.netflix.com/search?q=${encodedTitle}`,
        'amazon prime video': `https://www.primevideo.com/search/?phrase=${encodedTitle}&phrase=${encodedTitle}`,
        'disney plus': `https://www.disneyplus.com/search?q=${encodedTitle}`,
        'hbo max': `https://www.max.com/search?q=${encodedTitle}`,
        'max': `https://www.max.com/search?q=${encodedTitle}`,
        'hulu': `https://www.hulu.com/search?q=${encodedTitle}`,
        'apple tv': `https://tv.apple.com/search?term=${encodedTitle}`,
        'google play movies': `https://play.google.com/store/search?q=${encodedTitle}&c=movies`,
        'paramount plus': `https://www.paramountplus.com/search?q=${encodedTitle}`,
        'peacock': `https://www.peacocktv.com/search?q=${encodedTitle}`,
        'amazon video': `https://www.amazon.com/s?k=${encodedTitle}+movie`,
        'rakuten tv': `https://www.rakuten.tv/search?q=${encodedTitle}`,
        'filmin': `https://www.filmin.es/buscar?q=${encodedTitle}`,
        'movistar': `https://www.movistarplus.es/buscar?q=${encodedTitle}`,
        'clarovideo': `https://www.clarovideo.com/buscar?q=${encodedTitle}`,
        'sky': `https://www.sky.com/watch/search?q=${encodedTitle}`,
        ' Crunchyroll': `https://www.crunchyroll.com/search?q=${encodedTitle}`,
        'tubi': `https://tubitv.com/search?q=${encodedTitle}`,
        'pluto tv': `https://pluto.tv/search?q=${encodedTitle}`,
        'mubi': `https://mubi.com/search?q=${encodedTitle}`,
    };

    const match = Object.entries(providerUrls).find(([key]) => providerName.includes(key));
    return match ? match[1] : `https://www.google.com/search?q=${encodedTitle}+ver+online`;
};

export function Providers({ watchProviders, movieTitle, movieYear }: { watchProviders: WatchProviders; movieTitle: string | undefined; movieYear?: string }) {
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
                                const directUrl = getDirectUrl(item.provider, movieTitle || '');
                                return (
                                    <li key={`${item.provider.provider_id}-${index}`}>
                                        <a href={directUrl} target="_blank" rel="noopener noreferrer">
                                            {item.type}: {item.provider.provider_name}
                                        </a>
                                    </li>
                                );
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