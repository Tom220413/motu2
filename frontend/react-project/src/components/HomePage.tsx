import React from 'react'
import ReviewSlider from './layout/slider/ReviewSlider';
import { Review } from "../types/types";

const HomePage = () => {
    const reviews: Review[] = [
        {
            id: 1,
            author: 'John Smith',
            text: 'えええ'
        },
        {
            id: 2,
            author: 'Jane Doe',
            text: 'ううう'
        },
        {
            id: 3,
            author: 'Mike Johnson',
            text: 'いいい'
        },
        {
            id: 4,
            author: 'Alice Williams',
            text:
                'あああ',
        },
        {
            id: 5,
            author: 'Alice Williams',
            text:
                'おおお',
        },

    ]
    // テスト的に値を入れている　本来はdbから値を取ってくる
    const rankings: Review[] = [
        {
            id: 1,
            author: '1位',
            text: 'えええ'
        },
        {
            id: 2,
            author: '2位',
            text: 'ううう'
        },
        {
            id: 3,
            author: '3位',
            text: 'いいい'
        },
        {
            id: 4,
            author: '4位',
            text:
                'あああ',
        },
        {
            id: 5,
            author: '5位',
            text:
                'おおお',
        },

    ]

    const ranking = (rankings: Review[]) => {
        return (
            <ReviewSlider reviews={rankings || []} />
        )
    }
    const review = (reviews: Review[]) => {
        return (
            <ReviewSlider reviews={reviews || []} />
        )
    }

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
                    {review(reviews)}
                </div>
                <br />
                <div className='rankingbox'>
                    {ranking(rankings)}
                </div>
            </div>
        </>
    )
}

export default HomePage
