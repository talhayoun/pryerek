import { ADD_DISCOUNT_PRODUCTS, REPLACE_PRODUCTS, SET_PRODUCTS, } from "./actions/productsActions";

export const initialValue = {
    fetchedAllProducts: false,
    allProducts: [],
    products: [],
};

const productsReducer = (state, action) => {
    switch (action.type) {
        case REPLACE_PRODUCTS:
            return { ...state, products: [...action.products] };
        case SET_PRODUCTS:
            let sortedProducts = [];
            for (let i = 0; i < action.products.length; i++) {
                const category = action.products[i].category;
                if (!category) continue;
                if (!sortedProducts[category]) sortedProducts[category] = [];
                sortedProducts[category].push(action.products[i]);
            }

            return {
                ...state,
                fetchedAllProducts: true,
                allProducts: sortedProducts,
            };
        case ADD_DISCOUNT_PRODUCTS:
            const cloneAllProducts = [...state.allProducts];
            cloneAllProducts[7] = action.products;
            return { ...state, allProducts: cloneAllProducts }
        default:
            return { ...state };
    }
};

export default productsReducer;
