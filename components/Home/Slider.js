import React from "react";
import Carousel from "react-material-ui-carousel";

const slides = [
    {
        id: 1,
        image: "/images/slides/2.jpg",
    },
    {
        id: 2,
        image: "/images/slides/farming.jpg",
    },
    {
        id: 3,
        image: "/images/slides/3.jpg",
    },
];

const Slider = () => {
    return (
        <Carousel>
            {slides.map((item, i) => (
                <div
                    key={i}
                    className="slider-item"
                    style={{
                        background: `url('${item.image}')`,
                    }}
                ></div>
            ))}
        </Carousel>
    );
};

export default Slider;
