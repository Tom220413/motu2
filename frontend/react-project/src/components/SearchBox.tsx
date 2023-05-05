import React, { useState } from 'react';

type SearchBoxProps = {
    onSearch: (query: string) => void;
};

export const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearch(query);
    };

    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={query} onChange={handleQueryChange} placeholder="例：店名、ジャンル" />
            <button type="submit">Search</button>
        </form>
    );
};
