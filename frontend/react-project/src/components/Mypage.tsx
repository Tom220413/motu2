import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { mypage } from '../apis/todos'
// import { mypage } from '../types/types';

const Mypage = () => {
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
            <h1>mypage</h1>
            
            </div>
    );
};

export default Mypage;