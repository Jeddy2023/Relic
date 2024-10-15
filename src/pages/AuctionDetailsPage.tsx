import React, { useContext, useEffect, useState } from 'react';
import { styles } from '../components/Styles/styles';
import BreadCrumb from '../components/common/BreadCrumb';
import { useParams } from 'react-router-dom';
import { api } from '../api/axios';
import toast from 'react-hot-toast';
import { Product } from '../utils/types';
import { ApiError } from '../utils/apiHelpers';
import { UserContext } from '../hooks/userContext';
import { Carousel } from '@mantine/carousel';
import { calculateTimeLeft, formatAuctionEndDate, formatBidAmount } from '../utils/utils';
import Unauthorized from '../assets/images/unauthorized.svg';
import Winner from '../assets/images/Winners2.gif';
import { Button, Flex, NumberInput, Tabs } from '@mantine/core';
import '../assets/styles/tab.css';
import AuctionHistory from '../components/features/AuctionHistory';
import Loader from '../components/common/Loader';

type Props = {};

const AuctionDetailsPage: React.FC<Props> = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useContext(UserContext);
  const [auctionData, setAuctionData] = useState<Product | null>(null);
  const [bidAmount, setBidAmount] = useState<number | string>(0);
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(''));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchTrigger, setFetchTrigger] = useState<boolean>(true);

  useEffect(() => {
    const fetchAuctionData = async () => {
      try {
        const response = await api.get(`/auctions/${id}`);
        const auction = response?.data;
        setAuctionData(auction);
        setBidAmount(auction?.currentBid + 10);
        setTimeLeft(calculateTimeLeft(auction?.biddingTimeLimit || ''));
      } catch (error) {
        const err = error as ApiError;
        toast.error(err.response?.data?.message || 'An error occurred while fetching auction details');
        console.error('Error fetching auction details:', err);
      } finally {
        setFetchTrigger(false);
      }
    };

    fetchAuctionData();
  }, [id, fetchTrigger]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    // Implement bid submission logic
    try {
      if (auctionData) {
        const response = await api.post(`/bid/place/${id}`, { bidAmount });
        toast.success(response.data.message || 'Bid placed successfully!');
        setBidAmount(response?.data?.currentBid + 10);
        setFetchTrigger(true);
      }
    } catch (error) {
      console.log(error)
      const err = error as ApiError;
      toast.error(err.response?.data?.message || 'An error occurred while placing bid');
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className={`${styles.page} pt-3 bg-white dark:bg-[#0e0e0ec1] text-gray-800 dark:text-gray-200`}>
      <BreadCrumb name="Auction Details" />
      {
        auctionData ?
          (
            <>
              <div className="flex gap-8 mb-8">
                {/* Product Image */}
                {auctionData && auctionData.imageUrls?.length === 0 && (
                  <div className="w-[45%] h-[500px] rounded-xl border-8 border-whitesmoke overflow-hidden">
                    <img
                      src={auctionData.productImageUrl}
                      alt={auctionData.name}
                      className="w-full h-full object-fill rounded-lg"
                    />
                  </div>
                )}

                {auctionData && auctionData.imageUrls?.length >= 1 && (
                  <div className="w-[45%] h-[530px] rounded-xl border-8 border-whitesmoke overflow-hidden">
                    <Carousel withIndicators height="100%">
                      <Carousel.Slide className="w-full h-full object-fill rounded-lg"><img src={auctionData.productImageUrl} alt={auctionData.name} /></Carousel.Slide>
                      {auctionData.imageUrls.map((url, index) => (
                        <Carousel.Slide key={index}>
                          <img
                            src={url}
                            alt={`${auctionData.name}-${index}`}
                            className="w-full h-full object-fill rounded-lg"
                          />
                        </Carousel.Slide>
                      ))}
                    </Carousel>
                  </div>
                )}

                {/* Product Info */}
                <div className="w-[55%]">
                  <h2 className="text-[35px] font-semibold text-gray-900 mb-3 !font-saira">{auctionData?.name}</h2>
                  <h4 className="text-lg font-medium text-gray-500 mb-5 !font-saira">{auctionData?.shortDescription}</h4>
                  <h4 className="text-base uppercase text-gray-900 font-medium mb-5">
                    Item Condition: <span className="text-gray-500">{auctionData?.condition}</span>
                  </h4>

                  {/* Time Left Section */}
                  <div className="mb-5">
                    <h4 className="text-base text-gray-900 font-medium mb-2">Time Left</h4>
                    <div className="flex gap-3">
                      <div className="text-center w-[25%] bg-white shadow-md p-4 rounded-md">
                        <span className="text-xl">{timeLeft.days}</span>
                        <p className="text-xs">Days</p>
                      </div>
                      <div className="text-center w-[25%] bg-white shadow-md p-4 rounded-md">
                        <span className="text-xl">{timeLeft.hours}</span>
                        <p className="text-xs">Hours</p>
                      </div>
                      <div className="text-center w-[25%] bg-white shadow-md p-4 rounded-md">
                        <span className="text-xl">{timeLeft.minutes}</span>
                        <p className="text-xs">Minutes</p>
                      </div>
                      <div className="text-center w-[25%] bg-white shadow-md p-4 rounded-md">
                        <span className="text-xl">{timeLeft.seconds}</span>
                        <p className="text-xs">Seconds</p>
                      </div>
                    </div>
                  </div>

                  {/* Auction Date */}
                  <h4 className="text-base text-gray-900 font-medium mb-5">
                    Auction ends: <span className="text-gray-500">{formatAuctionEndDate(auctionData?.biddingTimeLimit)}</span>
                  </h4>

                  {/* Current Bid */}
                  <p className="text-lg font-semibold text-gray-900 mb-5">
                    {auctionData?.winningBidderId != null && auctionData?.winningBidderId === user?.id
                      ? 'Winning'
                      : 'Current'}{' '}
                    bid: <span className="text-xl text-gray-900">₦{formatBidAmount(auctionData?.currentBid ?? 0)}</span>
                  </p>

                  {/* Reserve Price */}
                  {auctionData?.winningBidderId == null && auctionData?.winningBidderId !== user?.id && (
                    <div className="flex gap-2">
                      {auctionData && auctionData?.currentBid >= auctionData?.minimumBid && auctionData?.numberOfBids >= 1 ? (
                        <p className="inline-block bg-whitesmoke py-2 px-4 text-gray-900">Reserve price has been met</p>
                      ) : null}
                    </div>
                  )}

                  {/* Bid Form */}
                  {user?.role !== 'ADMIN' ? (
                    auctionData?.winningBidderId != null && auctionData.winningBidderId === user?.id ? (
                      <div className="flex items-center justify-center gap-5 py-4 bg-whitesmoke">
                        <img src={Winner} className="w-[100px]" alt="Winner" />
                        <h2 className="text-xl text-gray-500">You are the winner of this Auction</h2>
                      </div>
                    ) : (
                      <form className="mb-5" onSubmit={handleSubmit}>
                        <Flex gap={'sm'}>
                          <NumberInput
                            value={bidAmount}
                            onChange={(bidAmount) => setBidAmount(bidAmount)}
                            min={auctionData?.currentBid ?? 0}
                            size='lg'
                            hideControls={false}
                            thousandSeparator=","
                            allowDecimal={false}
                            allowNegative={false}
                            prefix="₦"
                          />
                          <Button type='submit' size='lg' color='#32c36c' loading={isLoading}>
                            Bid
                          </Button>
                        </Flex>
                      </form>
                    )
                  ) : (
                    <div className="flex items-center justify-center gap-5 py-4 bg-whitesmoke">
                      <img src={Unauthorized} className="w-[100px]" alt="Unauthorized" />
                      <h2 className="text-xl text-gray-500">Cannot Access this Resource</h2>
                    </div>
                  )}
                </div>
              </div>
              <div className='product-details-container-bottom'>
                <Tabs defaultValue="description">
                  <Tabs.List>
                    <Tabs.Tab value="description">
                      <h1>Description</h1>
                    </Tabs.Tab>
                    <Tabs.Tab value="history">
                      <h1>History</h1>
                    </Tabs.Tab>
                    {/* <Tabs.Tab value="review">
              <h1>Reviews(2)</h1>
            </Tabs.Tab> */}
                  </Tabs.List>

                  <Tabs.Panel value="description">
                    <div className="product-details-container-bottom-tab-detail shadow-md">
                      <h2>Description</h2>
                      <h4>{auctionData?.description}</h4>
                    </div>
                  </Tabs.Panel>

                  <Tabs.Panel value="history">
                    <AuctionHistory productId={id} fetchTrigger={fetchTrigger} />
                  </Tabs.Panel>
                </Tabs>
              </div>
            </>
          )
          : <Loader />
      }
    </div>
  );
};

export default AuctionDetailsPage;
