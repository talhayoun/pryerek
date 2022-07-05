export const REPLACE_PRODUCTS = 'ADD_PRODUCTS';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const replaceProductsAction = (products) => ({
    type: REPLACE_PRODUCTS,
    products
});

export const setAllProductsAction = (products) => ({
    type: SET_PRODUCTS,
    products
});