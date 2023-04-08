import React, { useState } from 'react';
import { SearchBox } from './SearchBox';
import { SearchResult } from './SearchResults';
import { SearchHit } from '../types/types';

export const Search: React.FC = () => {
    const [results, setResults] = useState<SearchHit[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const handleSearch = async (query: string) => {
        const response = await fetch(`/search?q=${query}`);
        const data = await response.json();
        setResults(data.hits);
        setTotalPages(Math.ceil(data.total / 10));
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    const displayedResults = results.slice(startIndex, endIndex);

    return (
        <div>
            <SearchBox onSearch={handleSearch} />
            <SearchResult
                results={displayedResults}
                onPageChange={handlePageChange}
                currentPage={currentPage}
                totalPages={totalPages}
            />
        </div>
    );
};
