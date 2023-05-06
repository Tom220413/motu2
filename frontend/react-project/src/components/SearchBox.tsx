import React, { useState } from 'react';

type SearchBoxProps = {
    onSearch: (query: string) => void;
    onQueryChange: (query: string) => void;
};

export const SearchBox: React.FC<SearchBoxProps> = ({ onSearch, onQueryChange }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
        onQueryChange(event.target.value);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={query} onChange={handleInputChange} placeholder="例：店名、ジャンル" />
        </form>
    );
};
