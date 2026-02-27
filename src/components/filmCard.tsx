import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import type { FilmType } from '../types/types';
import { useTrailer } from '../hooks/useTrailer';
import './filmCardStyle.css';

interface FilmCardProps extends FilmType {
  movieorTv: string;
}

export function FilmCard(film: FilmCardProps) {
    const [showTrailer, setShowTrailer] = useState(false);
    const { trailerInfo, isLoading } = useTrailer(showTrailer ? film.id : null , film.movieorTv);

    const handleTrailerClick = useCallback(() => {
        setShowTrailer(true);
    }, []);

    const openTrailer = useCallback(() => {
        const trailer = trailerInfo?.results.find(
            (video) => video.type === 'Trailer' && video.site === 'YouTube'
        );
        if (trailer?.key) {
            window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank');
        }
    }, [trailerInfo]);

    if (showTrailer && !isLoading && trailerInfo?.results) {
        const hasTrailer = trailerInfo.results.some(
            (video) => video.type === 'Trailer' && video.site === 'YouTube'
        );
        if (hasTrailer) {
            openTrailer();
        }
        setShowTrailer(false);
    }

    const filmTitle = film.title || film.name || '';
    const year = film.release_date ? film.release_date.split('-')[0] : 'N/A';

    return (
        <div className="film-card">
            <h2>{filmTitle}</h2>
            <p>Año: {year}</p>
            
            {film.poster_path && (
                <img 
                    src={`https://image.tmdb.org/t/p/w200${film.poster_path}`} 
                    alt={`Póster de ${filmTitle}`}
                />
            )}  

            <div className="film-card-actions">
                <button 
                    className="btn btn-trailer" 
                    onClick={handleTrailerClick}
                    disabled={isLoading}
                >
                    🎬 Ver Trailer
                </button>
            </div>

            <p className="rating">{film.vote_average.toFixed(1)} ({film.vote_count} votos)</p>         
            <p className="overview">{film.overview}</p>
            <Link to={`/film/${film.id}/${film.movieorTv}`} className="btn btn-secondary">Ver más</Link>
        </div>
    );
}
