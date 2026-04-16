
import { useState } from 'react';
import './moviePlayer.css';

const SOURCES = [
    { name: '2Embed', url: (id: number, type: string) => `https://www.2embed.cc/embed/${id}` },
    { name: 'VidSrc', url: (id: number, type: string) => `https://vidsrc.rip/embed/${type}/${id}` },
    { name: 'VidBinge', url: (id: number, type: string) => `https://vidbinge.to/${type}/${id}` },
    { name: 'Viking', url: (id: number, type: string) => `https://vembed.stream/play/${id}` },
];

interface MoviePlayerProps {
    tmdbId: number;
    title: string;
    type: 'movie' | 'tv';
    onClose?: () => void;
}

export function MoviePlayer({ tmdbId, title, type, onClose }: MoviePlayerProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentSource, setCurrentSource] = useState(0);
    
    const embedUrl = SOURCES[currentSource].url(tmdbId, type);

    const selectSource = (index: number) => {
        setCurrentSource(index);
        setIsLoading(true);
        setError(null);
    };

    return (
        <div className="movie-player-overlay">
            <div className="movie-player-container">
                <div className="movie-player-header">
                    <h3>{title}</h3>
                    <button className="movie-player-close" onClick={onClose}>×</button>
                </div>
                <div className="movie-player-source-bar">
                    <span className="source-label">Fuente:</span>
                    <div className="source-buttons">
                        {SOURCES.map((source, index) => (
                            <button
                                key={source.name}
                                className={`source-btn ${currentSource === index ? 'active' : ''}`}
                                onClick={() => selectSource(index)}
                            >
                                {source.name}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="movie-player-wrapper">
                    {isLoading && <div className="movie-player-loading">Cargando...</div>}
                    {error && <div className="movie-player-error">{error}</div>}
                    <iframe
                        src={embedUrl}
                        allowFullScreen
                        allow="autoplay; fullscreen"
                        onLoad={() => setIsLoading(false)}
                        onError={() => {
                            setIsLoading(false);
                            setError('No se pudo cargar. Prueba otra fuente.');
                        }}
                        className="movie-player-iframe"
                    />
                </div>
            </div>
        </div>
    );
}