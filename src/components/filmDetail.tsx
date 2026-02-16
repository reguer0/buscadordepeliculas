import { useParams, Link } from "react-router-dom";
import { useProviders } from "../hooks/useProviders";
import { useDetails } from "../hooks/useDetails";
import { Providers } from "./providers.component";
import { Cast } from "./cast";
import './filmDetail.css';

export function FilmDetail() {
    const { id } = useParams<{ id: string }>();
    const filmId = id ? parseInt(id) : null;
    
    const { providerInfo, isLoading: providersLoading } = useProviders(filmId);
    const { data: movie, isLoading: movieLoading, error } = useDetails(filmId);

    if (movieLoading || providersLoading) {
        return <div className="film-detail-loading">Cargando...</div>;
    }

    if (error || !movie) {
        return (
            <div className="film-detail-error">
                <p>Error al cargar los detalles de la película.</p>
                <Link to="/" className="btn btn-secondary">Volver</Link>
            </div>
        );
    }

    const year = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';
    const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}min` : 'N/A';

    return (
        <div className="film-detail">
            <Link to="/" className="btn btn-secondary">← Volver</Link>
            
            <div className="film-detail-header">
                {movie.poster_path && (
                    <img 
                        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                        alt={`Póster de ${movie.title}`}
                        className="film-detail-poster"
                    />
                )}
                <div className="film-detail-info">
                    <h1>{movie.title}</h1>
                    {movie.tagline && <p className="film-tagline">{movie.tagline}</p>}
                    <div className="film-meta">
                        <span>{year}</span>
                        <span>{runtime}</span>
                        <span className="rating">⭐ {movie.vote_average.toFixed(1)}</span>
                    </div>
                    <div className="film-genres">
                        {movie.genres.map(genre => (
                            <span key={genre.id} className="genre-tag">{genre.name}</span>
                        ))}
                    </div>
                    <p className="film-overview">{movie.overview}</p>
                </div>
            </div>

            <Providers watchProviders={providerInfo?.results || {}} movieTitle={movie.title} />            
            <Cast cast={movie.credits.cast} />
        </div>
    );
}
