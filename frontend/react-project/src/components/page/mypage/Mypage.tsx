import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { mypage } from '../../../apis/apis'
import { MypageCountType } from '../../../types/types';
import ProfileEdit from '../profile/ProfileEdit'; 

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
                        <p>こんな店舗がおすすめです！</p>
                    </div>
                    <div id="dotted-line"></div>
                    <div id='mypage-edit'><p>プロフィールを編集する</p></div>
                    <div>
                        {/* 他のMypageコンテンツ... */}
                        <ProfileEdit userId={1} />
                        {/* もっとMypageコンテンツ... */}
                    </div>

                </>
            )}
        </div>
    );

};

export default Mypage;