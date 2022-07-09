import React, { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import "../styles/globals.css";
import "../styles/responsive.css";
import { ProductsContextProvider } from "../context/productsContext";
import { DropdownContextProvider } from "../store/dropdown";

function MyApp({ Component, pageProps }) {
	const [cartItems, setCartItems] = useState([]);

	useEffect(() => {
		if (localStorage.getItem("cart")) {
			setCartItems(JSON.parse(localStorage.getItem("cart")));
		}
	}, []);

	const localizeCart = () => {
		localStorage.setItem("cart", JSON.stringify(cartItems));
	};

	useEffect(() => {
		localizeCart();
	}, [cartItems]);

	return (
		<>
			<Head>
				<title>פרי וירק ארצנו - פירות וירקות טריים</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>

			<ProductsContextProvider>
				<DropdownContextProvider>
					<Layout cartItems={cartItems} setCartItems={setCartItems}>
						<Component
							{...pageProps}
							cartItems={cartItems}
							setCartItems={setCartItems}
						/>
					</Layout>
				</DropdownContextProvider>
			</ProductsContextProvider>
		</>
	);
}

export default MyApp;
