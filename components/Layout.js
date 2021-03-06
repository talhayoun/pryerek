import React, { useContext, useEffect, useState } from "react";
import Script from "next/script";

import Header from "./Header";
import Footer from "./Footer";
import Cart from "./Cart/Cart";
import { ProductsContext } from "../context/productsContext";
import {
    fetchedAllProducts,
    fetchProductsByCategoryId,
} from "../apis/products";
import {
    addDiscountProductsAction,
    setAllProductsAction,
} from "../store/actions/productsActions";
import { Nav } from "./Home/Nav";
import { BsWhatsapp, BsFillTelephoneFill } from "react-icons/bs";

const Layout = ({ children, cartItems, setCartItems }) => {
    const [cartTog, setCartTog] = useState(false);
    const { productsState, dispatchProducts } = useContext(ProductsContext);

    useEffect(() => {
        const fetchedProducts = productsState?.fetchedAllProducts;
        if (!fetchedProducts) {
            const getProducts = async () => {
                const response = await fetchedAllProducts();
                const products = response?.data?.products;
                dispatchProducts(setAllProductsAction(products));
                fetchDiscountProducts();
            };
            getProducts();

            const fetchDiscountProducts = async () => {
                const response = await fetchProductsByCategoryId(7);
                const products = response?.data?.products;
                dispatchProducts(addDiscountProductsAction(products));
            };
        }
    }, []);

    return (
        <div className="website-content">
            <div>
                <Header
                    cartTog={cartTog}
                    setCartTog={setCartTog}
                    cartItems={cartItems}
                />
                <Nav />
            </div>

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
            <Cart
                cartTog={cartTog}
                setCartTog={setCartTog}
                cartItems={cartItems}
                setCartItems={setCartItems}
            />

            {children}

            <div id="bottom-contact">
                טלפון ליצירת קשר: <a href="tel:0528629030">0528629030</a>
            </div>

            <Footer />

            <Script src="https://cdn.enable.co.il/licenses/enable-L804575kdnhulif-0221-25262/init.js" />
        </div>
    );
};

export default Layout;
