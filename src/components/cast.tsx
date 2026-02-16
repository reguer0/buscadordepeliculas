import type { CastMember } from '../types/types';
import './cast.css';

interface CastProps {
    cast: CastMember[];
}

export function Cast({ cast }: CastProps) {
    const topCast = cast.slice(0, 6);

    if (topCast.length === 0) {
        return null;
    }

    return (
        <div className="cast-section">
            <h3>Reparto Principal</h3>
            <div className="cast-grid">
                {topCast.map((actor) => (
                    <div key={actor.id} className="cast-card">
                        {actor.profile_path ? (
                            <img 
                                src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                                alt={actor.name}
                                className="cast-photo"
                            />
                        ) : (
                            <div className="cast-photo-placeholder">🎭</div>
                        )}
                        <div className="cast-info">
                            <p className="cast-name">{actor.name}</p>
                            <p className="cast-character">{actor.character}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
