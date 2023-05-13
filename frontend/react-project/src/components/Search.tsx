import React, { useState } from 'react';
import { SearchBox } from './SearchBox';
import { SearchResult } from './SearchResults';
import { SearchHit } from '../types/types';
import LocatioinSearch from './LocationSearch';
import { search } from '../apis/todos';


export const Search: React.FC = () => {
    const [results, setResults] = useState<SearchHit[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = async (searchQuery: string) => {
        const locationQuery = localStorage.getItem('selectedPrefectures');
        const response = await search(encodeURIComponent(searchQuery), encodeURIComponent(JSON.stringify([locationQuery])))
            .catch((error) => {
                console.error(error);
            });
        if (response) {
            const data1 = response.data;
            // 以降の処理...
            // // const data = await response.json();
            // setResults(data)
            console.log(data1)
            const data = JSON.stringify(data1);
            console.log(data);
            const parsedData = JSON.parse(data); // JavaScriptオブジェクトに変換
            // データの整形とセット
            const formattedData = parsedData.map((item: any) => {
                return {
                    id: item.id,
                    title: item.name,
                    titlecana: item.namekana,
                    address: item.address,
                    phone_number: item.phone_number,
                    url: "",
                    image_url: ""
                };
            });
            setTotalPages(Math.ceil(data.length / 10));
            setResults(formattedData);
            console.log(formattedData);
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
            <br />
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
