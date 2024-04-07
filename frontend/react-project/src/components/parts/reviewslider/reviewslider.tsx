import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Review } from "../../../types/types";


// 上で定義した型をここでインポートするか、同じファイル内に定義します

interface ReviewSliderProps {
    reviews: Review[]; // Review型の配列を期待する
}

const ReviewSlider: React.FC<ReviewSliderProps> = ({ reviews }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <Slider {...settings}>
            {reviews.map((review) => (
                <div key={review.storeId}>
                    <h3>{review.menu}</h3>
                    <p>{review.soup}</p>
                    <p>{review.shime}</p>
                    <p>{review.comment}</p>
                    {review.image.map((img) => (
                        <div key={img.id}>
                            <img src={img.url} alt={img.description} />
                        </div>
                    ))}
                </div>
            ))}
        </Slider>
    );
};

export default ReviewSlider;
