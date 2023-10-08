import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ranking } from '../apis/todos'
import { RankingType } from '../types/types';

const Ranking = () => {
    const [rankings, setRankings] = useState<Array<RankingType>>([]);

    useEffect(() => {
        const fetchRankings = async () => {
            try {
                const response = await ranking();
                console.log(response);
                if (response != null) {
                    setRankings(response.data);
                }
            } catch (error) {
                console.error('Error fetching rankings:', error);
            }
        };

        fetchRankings();
    }, []);

    return (
            <div id="rankingcontainer">
            <h1>Ramen Ranking</h1>
            <ul>
                {rankings.map((item, index) => (
                    <li key={index} id='ranking-list'>
                        <div id='ranking-item'>
                            <p>メニュー: {item.menu}</p>
                        </div>
                        <div id='ranking-item'>
                            <p>スープ: {item.soup}</p>
                        </div>
                        <div id='ranking-item'>
                            <p>しめ: {item.shime}</p>
                        </div>
                        <div id='ranking-item'>
                            <p>コメント: {item.comment}</p>
                        </div>
                        <ul>
                            {item.image.map((imageItem, imageIndex) => (
                                <li key={imageIndex} id='ranking-list'>
                                    <div id='ranking-item'>
                                        <p>画像ID: {imageItem.id}</p>
                                    </div>
                                    <div id='ranking-item'>
                                        <p>画像URL: {imageItem.url}</p>
                                    </div>
                                    <div id='ranking-item'>
                                        <p>画像説明: {imageItem.description}</p>
                                    </div>
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