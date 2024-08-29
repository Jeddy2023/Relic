import React, { useEffect, useState } from 'react';
import BreadCrumb from '../components/common/BreadCrumb';
import { styles } from '../components/Styles/styles';
import { Category, Product } from '../utils/types';
import { Select, Pagination } from '@mantine/core';
import NoAuctions from '../assets/images/empty-animate.svg';
import { useLocation } from 'react-router-dom';
import AuctionsSidebar from '../components/features/AuctionsSidebar';
import { formatBidAmount, formatRange, handlePageChange } from '../utils/utils';
import BidCard from '../components/common/BidCard';
import Loader from '../components/common/Loader';
import { fetchCategories } from '../api/apiServices';
import { getProducts } from '../utils/apiHelpers';

type Props = {};

const AuctionsPage: React.FC<Props> = ({ }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [condition, setCondition] = useState<string | null>(null);
  const [keyword, setKeyword] = useState<string>('');
  const [sliderValues, setSliderValues] = useState<[number, number]>([0, 10000000]);
  const [minimumBid, setMinimumBid] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>('Default Sorting');
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(6);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [rating, setRating] = useState<number | null>(null);
  const [fetchTrigger, setFetchTrigger] = useState<boolean>(true);

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search');
    const category = searchParams.get('category');

    setKeyword(searchQuery || '');

    if (category) {
      const selectedCategory = categories.find(
        (cat) => cat.name.toLowerCase() === category.toLowerCase()
      );
      setCategoryId(selectedCategory ? selectedCategory.id : null);
    } else {
      setCategoryId(null);
    }
  }, [location.search, categories]);

  useEffect(() => {
    if (fetchTrigger) {
      getProducts(
        {
          categoryId,
          condition,
          keyword,
          sliderValues,
          minimumBid,
          rating,
          sortBy,
          page,
          pageSize,
        },
        setProducts,
        setTotalPages,
        setTotalResults,
        setIsLoading
      );
      setFetchTrigger(false);
    } else {
      setIsLoading(true);
      getProducts(
        {
          categoryId,
          condition,
          keyword,
          sliderValues,
          minimumBid,
          rating,
          sortBy,
          page,
          pageSize,
        },
        setProducts,
        setTotalPages,
        setTotalResults,
        setIsLoading
      );
    }
  }, [categoryId, condition, keyword, sliderValues, minimumBid, rating, sortBy, page]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error(error);
      }
    };

    if (fetchTrigger) {
      getCategories();
      setFetchTrigger(false);
    }
  }, [fetchTrigger]);

  const handleSortChange = (value: string | null) => {
    if (value !== null) {
      setSortBy(value);
    } else {
      setSortBy('Default Sorting');
    }
  };

  const handleCategoryClick = (categoryId: number) => {
    setCategoryId(categoryId);
  };

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete('search');
    searchParams.set('search', event.target.value);
    window.history.replaceState(null, '', `?${searchParams.toString()}`);
  };

  const handleSliderChange = (value: [number, number]) => {
    setSliderValues(value);
  };

  const handleRatingChange = (value: number | null) => {
    setRating(value);
  };

  const clearFunction = (value: string) => {
    switch (value) {
      case 'search':
        setKeyword('');
        break;
      case 'categories':
        setCategoryId(null);
        break;
      case 'price':
        setSliderValues([0, 10000000]);
        break;
      case 'rating':
        setRating(null);
        break;
      default:
        setSortBy('Default Sorting');
    }
  };

  const startIndex = page * pageSize + 1;
  const endIndex = Math.min(startIndex + pageSize - 1, totalResults);

  return (
    <div
      className={`${styles.page} pt-3 bg-white dark:bg-[#0e0e0ec1] text-gray-800 dark:text-gray-200`}
    >
      <BreadCrumb name="Auctions" />
      <div className="mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-4">
          <h4 className="text-gray-800 dark:text-gray-300 font-semibold text-sm mb-4 lg:mb-0">
            {formatRange(startIndex, endIndex, totalResults)}
          </h4>
          <Select
            data={[
              'Default Sorting',
              'Sort by current bid: low to high',
              'Sort by current bid: high to low',
              'Sort auction by ending soonest',
              'Sort auction by recently started',
              'Sort auction by most active',
            ]}
            value={sortBy}
            onChange={handleSortChange}
            allowDeselect={false}
            checkIconPosition="right"
            size="md"
            className="w-full lg:w-auto"
          />
        </div>
        <div className="flex flex-col-reverse lg:flex-row-reverse lg:gap-5">
          <div className="w-full lg:w-3/4">
            {isLoading ? (
              <Loader />
            ) : (
              <div>
                {products && products.length > 0 ? (
                  <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {products.map((product) => (
                        <BidCard key={product.id} product={product} />
                      ))}
                    </div>
                    <Pagination
                      mt={30}
                      color="#32c36c"
                      total={totalPages}
                      value={page + 1}
                      onChange={(newPage) => handlePageChange(newPage, setPage)}
                      className="w-full"
                      pb={30}
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={NoAuctions}
                      alt="No Auctions Found"
                      className="w-72 mx-auto"
                    />
                    <h1 className="text-lg font-semibold mt-4 dark:text-gray-200">
                      No Auctions Found
                    </h1>
                  </div>
                )}
              </div>
            )}
          </div>
          <AuctionsSidebar
            keyword={keyword}
            categories={categories}
            sliderValues={sliderValues}
            handleKeywordChange={handleKeywordChange}
            handleCategoryClick={handleCategoryClick}
            handleSliderChange={handleSliderChange}
            handleRatingChange={handleRatingChange}
            clearFunction={clearFunction}
            formatBidAmount={formatBidAmount}
          />
        </div>
      </div>
    </div>
  );
};

export default AuctionsPage;
