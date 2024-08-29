import React from 'react';
import { Accordion, Card, TextInput, RangeSlider } from '@mantine/core';
import { TbCurrencyNaira } from 'react-icons/tb';
import { FaStar } from 'react-icons/fa';
import { Category } from '../../utils/types';

type Props = {
    keyword: string;
    categories: Category[];
    sliderValues: [number, number];
    handleKeywordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCategoryClick: (id: number) => void;
    handleSliderChange: (value: [number, number]) => void;
    handleRatingChange: (rating: number) => void;
    clearFunction: (type: string) => void;
    formatBidAmount: (amount: number) => string;
}

const AuctionsSidebar: React.FC<Props> = ({ keyword, categories, sliderValues, handleKeywordChange, handleCategoryClick, handleSliderChange, handleRatingChange, clearFunction, formatBidAmount }) => {
    return (
        <div className="w-full lg:w-1/4 bg-white dark:bg-[#0e0e0ec1]">
            <Accordion p={0} className='dark:bg-transparent'>
                {/* Search Products */}
                <Accordion.Item value="search">
                    <Card radius="sm" className="bg-white dark:bg-[#0e0e0ec1] shadow-lg mb-5">
                        <Accordion.Control className="hover:bg-transparent p-0">
                            <Card.Section px={20} mb={25}>
                                <h2 className="text-xl md:text-2xl font-semibold relative !font-saira dark:text-gray-200">
                                    Search Products
                                    <span className="absolute bottom-[-10px] left-0 w-[40px] md:w-[50px] h-[3px] bg-[#32c36c] rounded-md dark:bg-[#0e0e0efc]"></span>
                                    <span className="absolute bottom-[-10px] left-[45px] md:left-[55px] w-[5px] h-[3px] bg-[#32c36c] rounded-md dark:bg-[#0e0e0efc]"></span>
                                </h2>
                            </Card.Section>
                        </Accordion.Control>
                        <Accordion.Panel>
                            <Card.Section>
                                <TextInput
                                    placeholder="Search Products"
                                    value={keyword}
                                    onChange={handleKeywordChange}
                                    className="border-gray-300 focus:border-[#32c36c] focus:ring-[#32c36c] !font-saira dark:bg-transparent dark:focus:border-[#32c36c] dark:focus:ring-[#32c36c]"
                                />
                            </Card.Section>
                            <button
                                className="text-[#32c36c] hover:underline mt-2 !font-saira dark:text-[#32c36c]"
                                onClick={() => clearFunction('search')}
                            >
                                Clear
                            </button>
                        </Accordion.Panel>
                    </Card>
                </Accordion.Item>

                {/* Categories */}
                <Accordion.Item value="categories">
                    <Card radius="sm" className="bg-white dark:bg-[#0e0e0ec1] shadow-lg p-5 mb-5">
                        <Accordion.Control className="focus:outline-none p-0 hover:bg-transparent">
                            <Card.Section px={20} mb={25}>
                                <h2 className="text-xl md:text-2xl font-semibold relative !font-saira dark:text-gray-200">
                                    Categories
                                    <span className="absolute bottom-[-10px] left-0 w-[40px] md:w-[50px] h-[3px] bg-[#32c36c] rounded-md dark:bg-[#0e0e0efc]"></span>
                                    <span className="absolute bottom-[-10px] left-[45px] md:left-[55px] w-[5px] h-[3px] bg-[#32c36c] rounded-md dark:bg-[#0e0e0efc]"></span>
                                </h2>
                            </Card.Section>
                        </Accordion.Control>
                        <Accordion.Panel>
                            <Card.Section>
                                <ul>
                                    {categories.map((category) => (
                                        <li
                                            key={category.id}
                                            className="flex justify-between items-center cursor-pointer hover:text-[#32c36c] relative pl-3 md:pl-5 mb-2 !font-saira group dark:text-gray-300 dark:hover:text-[#32c36c]"
                                            onClick={() => handleCategoryClick(category.id)}
                                        >
                                            {category.name}
                                            <span className="transition-colors">{category.productCount}</span>
                                            <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-[#32c36c] rounded-full dark:bg-[#32c36c]"></span>
                                        </li>
                                    ))}
                                </ul>
                            </Card.Section>
                            <button
                                className="text-[#32c36c] hover:underline mt-2 dark:text-[#32c36c] !font-saira"
                                onClick={() => clearFunction('categories')}
                            >
                                Clear
                            </button>
                        </Accordion.Panel>
                    </Card>
                </Accordion.Item>

                {/* Price Range */}
                <Accordion.Item value="price">
                    <Card radius="sm" className="bg-white dark:bg-[#0e0e0ec1] shadow-lg p-5 mb-5">
                        <Accordion.Control className="focus:outline-none p-0 hover:bg-transparent">
                            <Card.Section px={20} mb={25}>
                                <h2 className="text-xl md:text-2xl font-semibold relative !font-saira dark:text-gray-200">
                                    Price
                                    <span className="absolute bottom-[-10px] left-0 w-[40px] md:w-[50px] h-[3px] bg-[#32c36c] rounded-md dark:bg-[#0e0e0efc]"></span>
                                    <span className="absolute bottom-[-10px] left-[45px] md:left-[55px] w-[5px] h-[3px] bg-[#32c36c] rounded-md dark:bg-[#0e0e0efc]"></span>
                                </h2>
                            </Card.Section>
                        </Accordion.Control>
                        <Accordion.Panel>
                            <Card.Section>
                                <RangeSlider
                                    mt="sm"
                                    mb="sm"
                                    styles={{ thumb: { borderWidth: 2, padding: 3 } }}
                                    color="#32c36c"
                                    label={null}
                                    value={sliderValues}
                                    onChange={handleSliderChange}
                                    min={0}
                                    max={10000000}
                                    step={200000}
                                    thumbSize={25}
                                    thumbChildren={[
                                        <TbCurrencyNaira size="1rem" key="1" />,
                                        <TbCurrencyNaira size="1rem" key="2" />,
                                    ]}
                                />
                                <p className='!font-saira dark:text-gray-300'>
                                    ₦{formatBidAmount(sliderValues[0])} - ₦{formatBidAmount(sliderValues[1])}
                                </p>
                            </Card.Section>
                            <button
                                className="text-[#32c36c] hover:underline mt-2 dark:text-[#32c36c] !font-saira"
                                onClick={() => clearFunction('price')}
                            >
                                Clear
                            </button>
                        </Accordion.Panel>
                    </Card>
                </Accordion.Item>

                {/* Ratings */}
                <Accordion.Item value="ratings">
                    <Card radius="sm" className="bg-white dark:bg-[#0e0e0ec1] shadow-lg p-5 mb-5">
                        <Accordion.Control className="focus:outline-none p-0 hover:bg-transparent">
                            <Card.Section px={20} mb={25}>
                                <h2 className="text-xl md:text-2xl font-semibold relative !font-saira dark:text-gray-200">
                                    Ratings
                                    <span className="absolute bottom-[-10px] left-0 w-[40px] md:w-[50px] h-[3px] bg-[#32c36c] rounded-md dark:bg-[#0e0e0efc]"></span>
                                    <span className="absolute bottom-[-10px] left-[45px] md:left-[55px] w-[5px] h-[3px] bg-[#32c36c] rounded-md dark:bg-[#0e0e0efc]"></span>
                                </h2>
                            </Card.Section>
                        </Accordion.Control>
                        <Accordion.Panel>
                            <Card.Section>
                                <ul>
                                    {[5, 4, 3, 2, 1].map((rating) => (
                                        <li
                                            key={rating}
                                            className="flex justify-between items-center cursor-pointer hover:text-[#32c36c] relative pl-3 md:pl-5 mb-2 !font-saira group dark:text-gray-300 dark:hover:text-[#32c36c]"
                                            onClick={() => handleRatingChange(rating)}
                                        >
                                            {rating}
                                            <span className="text-[#32c36c41] group-hover:text-[#32c36c] transition-colors flex dark:text-gray-400 group-hover:dark:text-[#32c36c]">
                                                {[...Array(rating)].map((_, index) => (
                                                    <FaStar key={index} />
                                                ))}
                                            </span>
                                            <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-[#32c36c] rounded-full dark:bg-[#32c36c]"></span>
                                        </li>
                                    ))}
                                </ul>
                            </Card.Section>
                            <button
                                className="text-[#32c36c] hover:underline mt-2 dark:text-[#32c36c] !font-saira"
                                onClick={() => clearFunction('ratings')}
                            >
                                Clear
                            </button>
                        </Accordion.Panel>
                    </Card>
                </Accordion.Item>
            </Accordion>
        </div>
    );
};

export default AuctionsSidebar;
