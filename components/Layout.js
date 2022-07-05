import React, { useContext, useEffect, useState } from "react";
import Script from "next/script";

import Header from "./Header";
import Footer from "./Footer";
import Cart from "./Cart/Cart";
import { ProductsContext } from "../context/productsContext";
import { fetchedAllProducts } from "../apis/products";
import { setAllProductsAction } from "../store/actions/productsActions";

const Layout = ({ children, cartItems, setCartItems }) => {
    const [cartTog, setCartTog] = useState(false);
    const { productsState, dispatchProducts } = useContext(ProductsContext);

    useEffect(() => {
        console.log("HERE")
        const fetchedProducts = productsState?.fetchedAllProducts;
        if (!fetchedProducts) {
            console.log("HERE111")
            const getProducts = async () => {
                const response = await fetchedAllProducts();
                const products = response?.data?.products;
                dispatchProducts(setAllProductsAction(products));
            };
            getProducts();
        }
    }, []);

    return (
        <div className="website-content">
            <Header cartTog={cartTog} setCartTog={setCartTog} cartItems={cartItems} />
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
