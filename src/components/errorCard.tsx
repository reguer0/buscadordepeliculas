import type { ErrorCardProps } from '../types/types';

export function ErrorCard({ error }: ErrorCardProps) {
    return (
        <div className="error-message">            
            <p>{error}</p>
        </div>
    );
}
