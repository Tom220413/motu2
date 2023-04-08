import React from 'react';
import { SearchHit } from '../types/types';

type SearchResultProps = {
    results: SearchHit[];
    onPageChange: (page: number) => void;
    currentPage: number;
    totalPages: number;
};

export const SearchResult: React.FC<SearchResultProps> = ({
    results,
    onPageChange,
    currentPage,
    totalPages,
}) => {
    const handlePageChange = (page: number) => {
        onPageChange(page);
    };

    return (
        <div>
            <ul>
                {results.map((hit) => (
                    <li key={hit.id}>
                        <a href={hit.url}>{hit.title}</a>
                        <p>{hit.description}</p>
                    </li>
                ))}
            </ul>
            <div>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        disabled={currentPage === page}
                    >
                        {page}
                    </button>
                ))}
            </div>
        </div>
    );
};
