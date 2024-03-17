import React from "react";
import Slider from "react-slick";

type Review = {
    id: number;
    author: string;
    text: string;
}
const sliderStyle = {
    width: '80%',
    margin: '0 auto',
};


const ReviewSlider = ({ reviews = [] }: { reviews?: Review[] }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: Math.min(reviews.length, 3), // 一度に表示するスライドの数
        slidesToScroll: 1, // 一度にスクロールするスライドの数
        centerMode: true, // 中央に表示されるスライドを拡大表示する
        centerPadding: "60px", // スライド間の余白
    };

    return (
        <div style={sliderStyle}>
            <Slider {...settings}>
                {reviews.map((review) => (
                    <div className="review-container" key={review.id}>
                        <div className="review-box">
                            <p>{review.author}</p>
                            <p>{review.text}</p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ReviewSlider;