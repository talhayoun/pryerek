import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import Slider from "../components/Home/Slider";
import ProductShowcase from "../components/ProductShowcase";
import { ProductsContext } from "../context/productsContext";
import { replaceProductsAction } from "../store/actions/productsActions";
import ReactPaginate from "react-paginate";

export default function Home({ cartItems, setCartItems }) {
	const [curPage, setCurPage] = useState(1);
	const [searchKeywords, setSearchKeywords] = useState("");
	const { productsState, dispatchProducts } = useContext(ProductsContext);
	const [currentItems, setCurrentItems] = useState(null);
	const [pageCount, setPageCount] = useState(0);
	const [itemOffset, setItemOffset] = useState(0);
	const [pageNumber, setPageNumber] = useState(0);
	let itemsPerPage = 10;

	const lastProductsLength = useRef(null);

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

	useEffect(() => {
		// Scroll to top when page changes
		window.scroll({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	}, [curPage, currentItems]);

	useEffect(() => {
		if (productsState?.products?.length > 0) {
			let currentItemOffset = itemOffset;
			if (productsState.products.length !== lastProductsLength.current) {
				lastProductsLength.current = productsState.products.length;
				setPageNumber(0);
				currentItemOffset = 0;
			}
			const endOffset = currentItemOffset + itemsPerPage;

			setCurrentItems(
				productsState.products.slice(currentItemOffset, endOffset)
			);
			setPageCount(Math.ceil(productsState.products.length / itemsPerPage));
		}
	}, [itemOffset, itemsPerPage, productsState.products]);

	const handlePageClick = (event) => {
		const newOffset =
			(event.selected * itemsPerPage) % productsState.products.length;

		setItemOffset(newOffset);

		setPageNumber(event.selected);
	};

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

					<ReactPaginate
						breakLabel="..."
						nextLabel={""}
						onPageChange={handlePageClick}
						pageRangeDisplayed={5}
						pageCount={pageCount}
						forcePage={pageNumber}
						previousLabel={""}
						renderOnZeroPageCount={null}
						activeLinkClassName="pagination-item active"
						pageClassName="pagination-item"
						containerClassName="home-pagination"
					/>

				</div>
			</div>
		</>
	);
}
