import React from 'react';
import { SearchHit } from '../types/types';
// import { Router } from 'express';
import { Store } from './Store';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

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
    const maxButtonsPerPage = 5; // 1ページに表示するボタンの最大数
    const totalButtons = Math.ceil(totalPages / maxButtonsPerPage);

    const buttonsToShow = [];
    const delta = Math.floor(maxButtonsPerPage / 2);
    let start = currentPage - delta;
    let end = currentPage + delta;

    if (start <= 0) {
        start = 1;
        end = Math.min(maxButtonsPerPage, totalButtons);
    } else if (end > totalButtons) {
        start = Math.max(totalButtons - maxButtonsPerPage + 1, 1);
        end = totalButtons;
    }

    for (let i = start; i <= end; i++) {
        buttonsToShow.push(i);
    }
    return (
        <div className='searchresult'>
            <div className='searchresultbox'>
                <ul className='searchresultul'>
                    {results.map((hit) => (
                        <li className='searchresultli' key={hit.id}>
                            <div className='searchresultliimg'>
                                <img src={hit.image_url}></img>
                            </div>
                            <h3>
                                <a href={`/store/${hit.id}`} target="_blank">{hit.title}</a>
                            </h3>
                            <h4>{hit.titlecana}</h4>
                            <p>{hit.description}</p>
                            <p>{hit.address}</p>
                            <p>{hit.phone_number}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="searchresultcount">
                {buttonsToShow.map((page) => (
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
