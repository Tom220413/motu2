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

        </div>
    );
};

export default Ranking;