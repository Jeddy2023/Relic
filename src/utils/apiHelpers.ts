import { fetchProducts } from "../api/apiServices";
import { buildQueryString } from "./utils";
import toast from 'react-hot-toast';

export const getProducts = async (
    filters: {
        categoryId: number | null;
        condition: string | null;
        keyword: string;
        sliderValues: [number, number];
        minimumBid: number | null;
        rating: number | null;
        sortBy: string;
        page: number;
        pageSize: number;
    },
    setProducts: React.Dispatch<React.SetStateAction<any[]>>,
    setTotalPages: React.Dispatch<React.SetStateAction<number>>,
    setTotalResults: React.Dispatch<React.SetStateAction<number>>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
    try {
        const params = {
            categoryId: filters.categoryId,
            condition: filters.condition,
            keyword: filters.keyword,
            minBid: filters.sliderValues[0],
            maxBid: filters.sliderValues[1],
            minimumBid: filters.minimumBid,
            rating: filters.rating,
            sortBy: filters.sortBy,
            page: filters.page,
            size: filters.pageSize,
        };

        const queryString = buildQueryString(params);
        const { products, totalPages, totalResults } = await fetchProducts(queryString);

        setProducts(products);
        setTotalPages(totalPages);
        setTotalResults(totalResults);
    } catch (error) {
        console.error(error);
        toast.error('An error occurred while getting auctions');
    } finally {
        setIsLoading(false);
    }
};