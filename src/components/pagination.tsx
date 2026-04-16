import './pagination.css';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalResults: number;
    onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, totalResults, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    const getVisiblePages = (): (number | string)[] => {
        const pages: (number | string)[] = [];
        const maxVisible = 5;
        
        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            
            if (currentPage > 3) pages.push('...');
            
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);
            
            for (let i = start; i <= end; i++) pages.push(i);
            
            if (currentPage < totalPages - 2) pages.push('...');
            
            pages.push(totalPages);
        }
        
        return pages;
    };

    const startResult = (currentPage - 1) * 20 + 1;
    const endResult = Math.min(currentPage * 20, totalResults);

    return (
        <div className="pagination">
            <span className="pagination-info">
                Mostrando {startResult}-{endResult} de {totalResults} resultados
            </span>
            
            <div className="pagination-controls">
                <button 
                    className="pagination-btn"
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    ← Anterior
                </button>
                
                <div className="pagination-pages">
                    {getVisiblePages().map((page, index) => (
                        page === '...' ? (
                            <span key={`ellipsis-${index}`} className="pagination-ellipsis">...</span>
                        ) : (
                            <button
                                key={page}
                                className={`pagination-page ${currentPage === page ? 'active' : ''}`}
                                onClick={() => onPageChange(page as number)}
                            >
                                {page}
                            </button>
                        )
                    ))}
                </div>
                
                <button 
                    className="pagination-btn"
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    Siguiente →
                </button>
            </div>
        </div>
    );
}
