import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { mypage } from '../apis/todos'
import { MypageCountType } from '../types/types';

const Mypage = () => {
    // useStateの変数名をrankingsからmypageCountsに変更
    const [mypageCounts, setMypageCount] = useState<MypageCountType>();

    useEffect(() => {
        const fetchMypageCount = async () => {
            try {
                // ここでAPIからユーザーIDに基づくデータを取得
                const response = await mypage(1);
                console.log(response);
                if (response != null) {
                    setMypageCount(response.data);
                }

            } catch (error) {
                console.error('Error fetching mypage counts:', error);
            }
        };
        fetchMypageCount();
    }, []);

    return (
        <div>
            {mypageCounts && (
                <>
                        <div id='mypage-list'>
                            <div id='mypage-item'>
                                <p>レビュー数：</p>
                                <h2>{mypageCounts.review_count}</h2>
                                <p>件</p>
                            </div>
                                <div id='mypage-item'>
                                <p>❤︎いいね数：</p>
                                <h2>{mypageCounts.iine_count}</h2>
                                <p>件</p>
                            </div>
                            <div id='mypage-item'>
                                <p>お気に入り店舗：</p>
                                <h2>{mypageCounts.favorite_count}</h2>
                                <p>件</p>
                            </div>
                    </div>
                    <div id='mypage-list'>
                        <p>あなたへのおすすめ</p>
                    </div>
                    
                </>
            )}
        </div>
    );

};

export default Mypage;