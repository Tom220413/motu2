import React, { useState } from 'react';
import { SearchBox } from './SearchBox';
import { SearchResult } from './SearchResults';
import { SearchHit } from '../types/types';
import LocatioinSearch from './LocationSearch';


export const Search: React.FC = () => {
    const [results, setResults] = useState<SearchHit[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = async (searchQuery: string) => {
        //ポート番号は直書きだから変更しなくては。。。
        try {
            let queryString = `http://localhost:8080/db/search?q=${encodeURIComponent(searchQuery)}`;
            const locationQuery = localStorage.getItem('selectedPrefectures');
            if (locationQuery !== null) {
                queryString += `&location=${encodeURIComponent(JSON.stringify([locationQuery]))}`;
            }
            const response = await fetch(queryString);
            const data = await response.json();
            console.log(data);
            setResults(data.hits);
            setTotalPages(Math.ceil(data.total / 10));
        } catch (error) {
            console.error(error);
        }

    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    const displayedResults = results.length ? results.slice(startIndex, endIndex) : [];
    const handleButtonClick = () => {
        handleSearch(searchQuery)
    }

    return (
        <div>
            <div>
                <p>▼キーワードで検索</p>
                <SearchBox onSearch={(query) => setSearchQuery(query)} onQueryChange={(query) => setSearchQuery(query)} />

            </div>
            <div>
                <p className='sercharea'>▼エリアから探す</p>
                <LocatioinSearch />
            </div>
            <button className="searchbutton" type="submit" onClick={() => handleSearch(searchQuery)}>
                もつ鍋検索
            </button>

            <SearchResult
                results={displayedResults}
                onPageChange={handlePageChange}
                currentPage={currentPage}
                totalPages={totalPages}
            />
            <br />
        </div>
    );
};
