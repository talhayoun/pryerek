import React, { useContext, useEffect, useState } from "react";

import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaAngleDown } from "react-icons/fa";
import Link from "next/link";
import { Nav } from "./Home/Nav";
import { ProductsContext } from "../context/productsContext";
import { replaceProductsAction } from "../store/actions/productsActions";
import { useRouter } from "next/dist/client/router";
import axios from "axios";
import { DropdownContext } from "../store/dropdown";

const Header = ({ cartTog, setCartTog, cartItems }) => {
    const [mobileNavTog, setMobileNavTog] = useState(false);
    const [catsTog, setCatsTog] = useState(false);
    const [searchKeywords, setSearchKeywords] = useState("");

    const router = useRouter();
    const { productsState, dispatchProducts } = useContext(ProductsContext);
    const { setIsDropdownVisible } = useContext(DropdownContext);

    const onClickCategory = (num) => {
        const filteredProducts = productsState.allProducts[num];
        window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
        dispatchProducts(replaceProductsAction(filteredProducts));
        router.push("/");
    };

    const onClickCategoryList = () => {
        setCatsTog((prevState) => {
            if (prevState) {
                setMobileNavTog(false);
            }
            return !prevState;
        });
    };

    const onHoverHeader = () => {
        setIsDropdownVisible(false);
    };

    const loadProducts = () => {
        let query = "";

        if (searchKeywords.length) {
            query += `&search=${searchKeywords}`;
        }

        axios.get(process.env.API_URL + "/products/?page=1" + query).then((res) => {
            dispatchProducts(replaceProductsAction(res.data.products));
        });
    };

    useEffect(() => {
        loadProducts();
    }, [searchKeywords]);

    return (
        <div id="header" onMouseEnter={onHoverHeader}>
            <div id="header-right">
                <Link href="/">
                    <a>
                        <div id="header-logo">
                            <div style={{ backgroundImage: "url('/images/logo.jpeg')" }} />
                        </div>
                    </a>
                </Link>
                <form action="" id="products-search-form-nav">
                    <input
                        type="text"
                        placeholder="חפש/י מוצרים"
                        value={searchKeywords}
                        onChange={(e) => setSearchKeywords(e.target.value)}
                        id="product-search-input"
                    />
                </form>
                <div id="header-links" className={`${mobileNavTog ? "active" : ""}`}>
                    <Link href="/">
                        <a
                            onClick={() => setMobileNavTog(false)}
                            className="header-link active"
                        >
                            דף הבית
                        </a>
                    </Link>
                    <Link href="/about">
                        <a onClick={() => setMobileNavTog(false)} className="header-link">
                            אודות
                        </a>
                    </Link>

                    <a
                        className="header-link dropdown-link"
                        onClick={onClickCategoryList}
                    >
                        <span className="categories-header">
                            קטגוריות <FaAngleDown />
                        </span>
                        {catsTog && (
                            <div className="dropdown">
                                <a onClick={() => onClickCategory(1)}>ירקות</a>

                                <a onClick={() => onClickCategory(2)}>פירות</a>
                                <a onClick={() => onClickCategory(3)}>מעדנייה</a>
                                <a onClick={() => onClickCategory(4)}>ירק ופטריות</a>
                                <a onClick={() => onClickCategory(5)}>מזווה</a>
                                <a onClick={() => onClickCategory(6)}>יבשים</a>
                                <a onClick={() => onClickCategory(7)}>מבצעים</a>
                            </div>
                        )}
                    </a>

                    <Link href="/legal">
                        <a onClick={() => setMobileNavTog(false)} className="header-link">
                            תקנון
                        </a>
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

            <div id="mobile-menu-tog" onClick={() => setMobileNavTog(!mobileNavTog)}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
};

export default Header;
