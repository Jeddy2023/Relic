import { Category, Product } from "../utils/types";
import { api } from "./axios";

export const fetchProducts = async (queryString: string): Promise<{ products: Product[], totalPages: number, totalResults: number }> => {
    const url = `/auctions/all${queryString}`;
    const response = await api.get(url);
    return {
        products: response.data.content || [],
        totalPages: response.data.totalPages || 0,
        totalResults: response.data.totalElements || 0,
    };
};

export const fetchCategories = async (): Promise<Category[]> => {
    const url = `/categories`;
    const response = await api.get(url);
    return response.data || [];
};