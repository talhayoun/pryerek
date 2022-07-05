import React, { useContext, useEffect, useState } from "react";
import Script from "next/script";

import Header from "./Header";
import Footer from "./Footer";
import Cart from "./Cart/Cart";
import { ProductsContext } from "../context/productsContext";
import { fetchedAllProducts, fetchProductsByCategoryId } from "../apis/products";
import { addDiscountProductsAction, setAllProductsAction } from "../store/actions/productsActions";

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
                console.log("here")
                const response = await fetchProductsByCategoryId(7);
                console.log(response, "##")
                const products = response?.data?.products;
                dispatchProducts(addDiscountProductsAction(products));
            }
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
