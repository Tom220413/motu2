import React from 'react';

const SearchHeader: React.FC = () => {
    // CSSスタイルを直接書き込む
    const styles = {
        backgroundColor: '#f2f2f2',
        padding: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        '& form': {
            display: 'flex',
            marginRight: '20px',
            '& input[type="text"]': {
                marginRight: '10px',
                padding: '5px',
                borderRadius: '5px',
                border: 'none',
            },
            '& button[type="submit"]': {
                backgroundColor: '#0077ff',
                color: '#fff',
                padding: '5px 10px',
                borderRadius: '5px',
                border: 'none',
                cursor: 'pointer',
            },
        },
        '& .header-links': {
            display: 'flex',
            justifyContent: 'flex-end',
            '& a': {
                marginRight: '10px',
                textDecoration: 'none',
                color: '#0077ff',
            },
        },
    };
    return (
        <div style={styles}>
            <div>
                <p>もつ鍋検索サイト</p>
            </div>
            <form>
                <input type="text" placeholder="Search" />
                <button type="submit">Search</button>
            </form>
            <div className="header-links">
                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
                <a href="#">Link 3</a>
            </div>
        </div>
    );
}



export default SearchHeader;
