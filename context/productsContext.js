import { createContext, useReducer } from "react";
import productsReducer, { initialValue } from "../store/products";

export const ProductsContext = createContext();

export const ProductsContextProvider = (props) => {
    const [productsState, dispatchProducts] = useReducer(
        productsReducer,
        initialValue
    );

    return (
        <ProductsContext.Provider value={{ productsState, dispatchProducts }}>
            {props.children}
        </ProductsContext.Provider>
    );
};
