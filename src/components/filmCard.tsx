import type { FilmType } from '../types/types';
import './filmCardStyle.css';
import { useState, useEffect } from 'react';
import { useTrailer } from '../hooks/useTrailer';


export function FilmCard(film: FilmType) {
    const [filmId, setFilmId] = useState<number | null>(null);

    const filmTrailerInfo = useTrailer(filmId);

    useEffect(() => {
        if (filmTrailerInfo?.trailerInfo?.results?.length > 0 && filmId) {
            const trailer = filmTrailerInfo?.trailerInfo?.results.find(
                (video: any) => video.type === 'Trailer' && video.site === 'YouTube'
            );
            if (trailer?.key) {
                const youtubeUrl = `https://www.youtube.com/watch?v=${trailer.key}`;
                window.open(youtubeUrl, "_blank");
                setFilmId(null);
            }
        }
    }, [filmTrailerInfo.trailerInfo]);

    const onFilmClick = (movieId: number) => {
        setFilmId(movieId);
    }

    return (
        <div className="film-card" >
            <h2>{film.title}</h2>
            <p>Release Date: {film.release_date}</p>
            
            {film.poster_path && (
                <img 
                    src={`https://image.tmdb.org/t/p/w200${film.poster_path}`} 
                    alt={`Poster of ${film.title}`} 
                    onClick={(e) => {
                        e.stopPropagation();
                        onFilmClick(film.id);
                    }}
                    style={{ cursor: 'pointer' }}
                />
            )}  
             <p className="rating">{film.vote_average} ({film.vote_count} votes)</p>         
            <p className="overview">{film.overview}</p>
           
        </div>
    );
}