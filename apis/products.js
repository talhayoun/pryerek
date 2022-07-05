import { axiosInstance } from "./index";

export const fetchProductsByCategoryId = async (categoryId) => {
    return await axiosInstance.get("/products", {
        params: { page: 1, category: categoryId },
    });
};

export const fetchedAllProducts = async () => {
    return await axiosInstance.get("/products", { params: { all: true } });
};
