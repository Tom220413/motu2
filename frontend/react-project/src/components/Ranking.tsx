import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ranking } from '../apis/todos'

const Ranking = () => {
    const [rankings, setRankings] = useState([]);

    useEffect(() => {
        const fetchRankings = async () => {
            try {
                const response = await ranking();
                if (response != null) {
                    setRankings(response);
                }
            } catch (error) {
                console.error('Error fetching rankings:', error);
            }
        };

        fetchRankings();
    }, []);

    return (
        <div>
            <h1>Ramen Ranking</h1>
            <ul>
                {rankings.map((item, index) => (
                    <li key={index}>
                        <p>店舗ID: {item.storeId}</p>
                        <p>メニュー: {item.menu}</p>
                        <p>スープ: {item.soup}</p>
                        <p>しめ: {item.shime}</p>
                        <p>コメント: {item.comment}</p>
                        <ul>
                            {item.image.map((imageItem, imageIndex) => (
                                <li key={imageIndex}>
                                    <p>画像ID: {imageItem.id}</p>
                                    <p>画像URL: {imageItem.url}</p>
                                    <p>画像説明: {imageItem.description}</p>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Ranking;