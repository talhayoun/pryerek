import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import Slider from "../components/Home/Slider";
import ProductShowcase from "../components/ProductShowcase";
import { ProductsContext } from "../context/productsContext";
import { replaceProductsAction } from "../store/actions/productsActions";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Home({ cartItems, setCartItems }) {
	const [curPage, setCurPage] = useState(1);
	const [searchKeywords, setSearchKeywords] = useState("");
	const { productsState, dispatchProducts } = useContext(ProductsContext);
	const [currentItems, setCurrentItems] = useState(null);
	const lastProductsLength = useRef(null);
	const productsLength = useRef(null);

	const loadProducts = () => {
		let query = "";

		if (searchKeywords.length) {
			query += `&search=${searchKeywords}`;
		}

		axios
			.get(process.env.API_URL + "/products/?page=" + curPage + query)
			.then((res) => {
				dispatchProducts(replaceProductsAction(res.data.products));
			});
	};

	useEffect(() => {
		loadProducts();
	}, [curPage]);

	useEffect(() => {
		setCurPage(1);
		loadProducts();
	}, [searchKeywords]);


	const fetchMoreProducts = () => {
		if (lastProductsLength.current + 10 >= productsLength) return;
		setCurrentItems(
			productsState.products.slice(0, lastProductsLength.current + 10)
		);
		lastProductsLength.current = lastProductsLength.current + 10;
	};

	useEffect(() => {
		productsLength.current = productsState?.products?.length;
		lastProductsLength.current = 0;
		fetchMoreProducts()

	}, [productsState])

	return (
		<>
			<Slider />

			<div className="container">
				<div id="home-main-content">
					<h2 id="our-products-title">המוצרים שלנו</h2>

					<form action="" id="products-search-form">
						<input
							type="text"
							placeholder="חפש/י מוצרים"
							value={searchKeywords}
							onChange={(e) => setSearchKeywords(e.target.value)}
							id="product-search-input"
						/>
					</form>

					{!productsState?.products.length && (
						<p id="no-products-found-p">לא נמצאו מוצרים התואמים את החיפוש.</p>
					)}

					<InfiniteScroll
						dataLength={currentItems?.length ?? 0}
						next={fetchMoreProducts}
						style={{ overflow: 'unset !important' }}
						hasMore={true}
					>
						<div id="main-products-list">
							{currentItems &&
								currentItems.map((product) => (
									<ProductShowcase
										key={product._id}
										id={product._id}
										cartItems={cartItems}
										minAmount={product.minAmount}
										setCartItems={setCartItems}
										description={product.description}
										name={product.name}
										price={product.price}
										salePrice={product.salePrice}
										unit={product.unitType}
										badge={product.badge}
										image={`https://eropa.co.il/fruits/uploads/${product.id}.jpg `}
									/>
								))}
						</div>
					</InfiniteScroll>
				</div>
			</div>
		</>
	);
}
