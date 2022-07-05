import React, { useContext } from "react";
import Carousel from "react-material-ui-carousel";
import { ProductsContext } from "../../context/productsContext";
import { changeDropdownVisibilityAction } from "../../store/actions/productsActions";

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
    const { productsState, dispatchProducts } = useContext(ProductsContext)

    const handleHover = () => {
        dispatchProducts(changeDropdownVisibilityAction(false))
    }
    return (
        <Carousel>
            {slides.map((item, i) => (
                <div
                    onMouseEnter={handleHover}
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
