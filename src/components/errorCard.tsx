

export function ErrorCard({ error }: { error: string }) {
    return (
        <div className="error-message">            
            <p>{error}</p>
        </div>
    );
}