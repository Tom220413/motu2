import React, { useState, useEffect } from 'react';
import { rankingtoppage, review } from '../apis/apis';
import { Review, RankingTop3Type } from "../types/types";
import ReviewSlider from '../components/parts/reviewslider/reviewslider';

const HomePage = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [rankings, setRankings] = useState<RankingTop3Type[]>([]);

    useEffect(() => {
        const fetchRankings = async () => {
            try {
                const response = await rankingtoppage(); // ranking関数の呼び出し
                setRankings(response.data);
            } catch (error) {
                console.error("ランキングデータの取得に失敗しました", error);
            }
        };

        const fetchReviews = async () => {
            try {
                const response = await review(); // ranking関数の呼び出し
                setReviews(response.data);
            } catch (error) {
                console.error("レビューデータの取得に失敗しました", error);
            }
        };

        fetchRankings();
        fetchReviews();
    }, []);

    return (
        <>
            <div className='contens-box'>
                <div className='titlebox'>
                    <table className='titletable'>
                        <tr>
                            <td>
                                <h3 className='homepagetitle'>もつ鍋検索サイト
                                    <br />
                                    あなたの好きなもつ鍋が<br />見つかるかも</h3 >
                            </td>
                            <td>
                                <img className="motuimg" src="img/food_motsunabe.png" /><br />
                            </td>
                        </tr>
                    </table>
                </div>
                <div className='reviewbox'>
                    <ReviewSlider reviews={reviews} />
                </div>
                <br />
                <div className="rankingbox">
                    {rankings.map((rank, index) => (
                        <div key={rank.storeid} className={`ranking-item ${index === 1 ? 'center' : ''}`}>
                            <h2>{index + 1}位: {rank.storename}</h2>
                            <p>{rank.address}</p>
                            <p>レビュー数: {rank.count}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default HomePage
