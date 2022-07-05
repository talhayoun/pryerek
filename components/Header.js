import React, { useContext, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsWhatsapp, BsFillTelephoneFill } from "react-icons/bs";
import { FaAngleDown } from "react-icons/fa";
import Link from "next/link";
import { Nav } from "./Home/Nav";
import { ProductsContext } from "../context/productsContext";
import { replaceProductsAction } from "../store/actions/productsActions";

const Header = ({ cartTog, setCartTog, cartItems }) => {
    const [mobileNavTog, setMobileNavTog] = useState(false);
    const [catsTog, setCatsTog] = useState(false);

    const { productsState, dispatchProducts } = useContext(ProductsContext);

    const onClickCategory = (num) => {
        const filteredProducts = productsState.allProducts[num];
        window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
        dispatchProducts(replaceProductsAction(filteredProducts));
    };

    const onClickCategoryList = () => {

        setCatsTog(prevState => {
            if (prevState) {
                setMobileNavTog(false);
            }
            return !prevState
        });
    }

    return (
        <>
            <div id="header">
                <div id="header-right">
                    <Link href="/">
                        <a>
                            <div id="header-logo">
                                <img src="/images/logo.png" alt="" />
                            </div>
                        </a>
                    </Link>
                    <div id="header-links" className={`${mobileNavTog ? "active" : ""}`}>
                        <Link href="/">
                            <a className="header-link active">דף הבית</a>
                        </Link>
                        <Link href="/about">
                            <a className="header-link">אודות</a>
                        </Link>

                        <a
                            className="header-link dropdown-link"
                            onClick={onClickCategoryList}
                        >
                            <span>
                                קטגוריות <FaAngleDown />
                            </span>
                            {catsTog && (
                                <div className="dropdown">
                                    <a onClick={() => onClickCategory(1)}>ירקות</a>

                                    <a onClick={() => onClickCategory(2)}>פירות</a>
                                    <a onClick={() => onClickCategory(3)}>מעדנייה</a>
                                    <a>ירק ופטריות</a>
                                    <a onClick={() => onClickCategory(4)}>מזווה</a>
                                    <a onClick={() => onClickCategory(5)}>יבשים</a>
                                    <a onClick={() => onClickCategory(6)}>מבצעים</a>
                                </div>
                            )}
                        </a>

                        <Link href="/legal">
                            <a className="header-link">תקנון</a>
                        </Link>
                    </div>
                </div>

                <div id="header-left">
                    <div id="header-cart-icon" onClick={() => setCartTog(!cartTog)}>
                        <div className="icon">
                            <AiOutlineShoppingCart />
                        </div>
                        <div className="number">{cartItems.length}</div>
                    </div>
                </div>

                <div
                    id="mobile-menu-tog"
                    onClick={() => setMobileNavTog(!mobileNavTog)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <Nav />

            <a
                href="https://api.whatsapp.com/send?phone=972528629030&amp;text=שלום פרי וירק ארצנו."
                className="float"
                target="_blank"
                rel="noreferrer"
            >
                <BsWhatsapp />
            </a>

            <a href="tel:0528629030" id="call-btn">
                <BsFillTelephoneFill />
            </a>
        </>
    );
};

export default Header;
