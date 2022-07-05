import { REPLACE_PRODUCTS, SET_PRODUCTS } from "./actions/productsActions";

export const initialValue = {
    fetchedAllProducts: false,
    allProducts: [],
    products: [
        // {
        //     id: "0208821d-fe14-4bc0-b6c5-033419301738",
        //     name: "יין טנא - קברנה סוביניון 2019",
        //     minAmount: "1",
        //     availability: true,
        //     category: 5,
        //     unitType: "יחידה",
        //     price: "65",
        // },
        // {
        //     unitType: "יחידה",
        //     availability: true,
        //     minAmount: "1",
        //     name: "חמציץ (מארז 200 גר')",
        //     id: "021f25e3-aaf9-4f4e-8769-21d115829b79",
        //     price: "18",
        //     category: 4,
        //     salePrice: 0,
        // },
        // {
        //     minAmount: "1",
        //     price: "6",
        //     availability: true,
        //     category: 4,
        //     id: "02357c36-332e-4e82-a3bc-de0528d0293c",
        //     unitType: "יחידה",
        //     name: "רשד\\שיבה (צרור)",
        //     salePrice: 0,
        // },
        // {
        //     category: 4,
        //     availability: true,
        //     id: "0267b34a-f911-4047-ba50-38453feff136",
        //     minAmount: "1",
        //     name: "מלוחייה (מארז 200 גר')",
        //     price: "11",
        //     unitType: "יחידה",
        //     salePrice: 0,
        // },
        // {
        //     name: "חמוציות מסוכרות (קופסא 200 גר')",
        //     id: "034596bc-2a24-436b-90f7-57c0f2e20ac0",
        //     price: "14",
        //     category: 6,
        //     minAmount: "1",
        //     availability: true,
        //     unitType: "יחידה",
        //     salePrice: 0,
        // },
        // {
        //     name: "ריבת קיווי איכותית (בוסטן 350 גר')",
        //     category: 5,
        //     availability: true,
        //     id: "034d9604-4117-4ba2-baa3-9c9e0e690e22",
        //     unitType: "יחידה",
        //     price: "35",
        //     minAmount: "1",
        //     salePrice: 0,
        // },
        // {
        //     category: 6,
        //     minAmount: "1",
        //     unitType: "יחידה",
        //     price: "15",
        //     name: "הל (100 גר')",
        //     id: "05447ba7-6d5d-46d4-944a-5f31378d2bd5",
        //     availability: true,
        //     salePrice: 0,
        // },
        // {
        //     minAmount: "1",
        //     id: "06e5857d-89e3-4f14-9592-67da2d973557",
        //     availability: true,
        //     unitType: "יחידה",
        //     category: 5,
        //     name: 'דבש - הדרים (למדני 1 ק"ג)',
        //     price: "50",
        //     salePrice: 0,
        // },
    ],
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
                if (!sortedProducts[category]) sortedProducts[category] = []
                sortedProducts[category].push(action.products[i]);
            }



            return { ...state, fetchedAllProducts: true, allProducts: sortedProducts };
        default:
            return { ...state };
    }
};

export default productsReducer;
