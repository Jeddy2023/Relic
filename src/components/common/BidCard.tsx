import React, { useEffect, useState } from 'react';
import { Button, Skeleton } from '@mantine/core';
import { Link } from 'react-router-dom';
import { calculateTimeLeft, formatBidAmount } from '../../utils/utils';
import { Product } from '../../utils/types';

interface Props {
    product: Product;
}

const BidCard: React.FC<Props> = ({ product }) => {
    const [productName, setProductName] = useState<string>(product?.name || '');
    const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(product?.biddingTimeLimit || ''));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(product?.biddingTimeLimit || ''));
        }, 1000);

        return () => clearInterval(timer);
    }, [product?.biddingTimeLimit]);

    const shortName = productName.length > 20 ? productName.substr(0, 18) + '...' : productName;

    return (
        <div className="w-full max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl bg-white dark:bg-[#0e0e0ec1] overflow-hidden shadow-lg mx-auto">
            <Skeleton visible={!product}>
                <div className="flex flex-col h-full">
                    <div className="flex-1 overflow-hidden">
                        <div className="flex items-center justify-center bg-white bg-opacity-75 dark:bg-[#0e0e0ec1] p-2">
                            <div className="flex space-x-2 sm:space-x-4 text-center text-xs sm:text-lg font-semibold dark:text-gray-300">
                                <span>{timeLeft.days}<p className="text-[10px] sm:text-xs font-light">Days</p></span>
                                <span>{timeLeft.hours}<p className="text-[10px] sm:text-xs font-light">Hours</p></span>
                                <span>{timeLeft.minutes}<p className="text-[10px] sm:text-xs font-light">Minutes</p></span>
                                <span>{timeLeft.seconds}<p className="text-[10px] sm:text-xs font-light">Seconds</p></span>
                            </div>
                        </div>
                        <div className='relative overflow-hidden'>
                            <img
                                src={product?.productImageUrl}
                                alt="Auction Item"
                                className="object-cover w-full h-40 sm:h-48 md:h-56 lg:h-64 transform transition-transform duration-500 hover:scale-110"
                            />
                        </div>
                    </div>
                    <div className="p-2 sm:p-4 flex flex-col flex-grow">
                        <Link to={`/auctions/${product?.id}`}>
                            <h2 className="text-sm sm:text-lg font-semibold mb-2 text-gray-800 truncate dark:text-gray-200">{shortName}</h2>
                        </Link>
                        <h4 className="text-xs sm:text-sm text-gray-600 font-medium mb-4 dark:text-gray-400">
                            Current Bid: <span className="text-black font-bold dark:text-gray-100">₦{formatBidAmount(product?.currentBid || 0)}</span>
                        </h4>
                        <Link to={`/auctions/${product?.id}`}>
                            <Button className="bg-bg-general hover:bg-bg-general text-white font-bold w-full !font-saira" size='md'>
                                Place a Bid
                            </Button>
                        </Link>
                    </div>
                </div>
            </Skeleton>
        </div>
    );
}

export default BidCard;
