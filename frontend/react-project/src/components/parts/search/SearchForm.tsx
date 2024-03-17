import { useState } from 'react';

type Props = {
    handleSearch: (query: string) => void;
}

export const SearchForm = ({ handleSearch }: Props) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSearch(query);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
            <button type="submit">Search</button>
        </form>
    );
};
