import { Table } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import NoAuctions from '../../assets/images/empty-animate.svg';
import toast from 'react-hot-toast';
import { ApiError } from '../../utils/apiHelpers';
import { api } from '../../api/axios';
import { formatAuctionEndDate, formatBidAmount } from '../../utils/utils';

interface BiddingHistoryData {
    id: string;
    updatedAt: string;
    bidderUsername: string;
    bidAmount: number;
    isWinningBid: boolean;
}

type Props = {
    productId: undefined | string;
    fetchTrigger: boolean;
}

const AuctionHistory: React.FC<Props> = ({ productId, fetchTrigger }) => {
    const [biddingHistory, setBiddingHistory] = useState<BiddingHistoryData[]>([]);

    useEffect(() => {
        const fetchBiddingHistory = async () => {
            try {
                const response = await api.get(`/bid/list/${productId}`);
                const history = response?.data;
                setBiddingHistory(history);
            } catch (error) {
                const err = error as ApiError;
                toast.error(err.response?.data?.message || 'An error occurred while fetching bidding history');
                console.error('Error fetching bidding history:', err);
            }
        }

        fetchBiddingHistory();
    }, [productId, fetchTrigger])

    const TableHeader = () => (
        <Table.Thead>
            <Table.Tr>
                <Table.Th>Date</Table.Th>
                <Table.Th>User</Table.Th>
                <Table.Th>Bid</Table.Th>
            </Table.Tr>
        </Table.Thead>
    );

    const TableRow = ({ data }: { data: BiddingHistoryData }) => (
        <Table.Tr key={data.id}>
            <Table.Td>{formatAuctionEndDate(data.updatedAt)}</Table.Td>
            <Table.Td>{data.bidderUsername}</Table.Td>
            <Table.Td>₦{formatBidAmount(data.bidAmount)}</Table.Td>
        </Table.Tr>
    );

    return (
        <div className='product-details-container-bottom-tab-detail shadow-md'>
            <h2>Auction History</h2>
            <Table.ScrollContainer minWidth={500} type="native">
                <Table verticalSpacing="md" highlightOnHover withTableBorder withColumnBorders>
                    <TableHeader />
                    <tbody>
                        {biddingHistory.length ? (
                            biddingHistory.map((history) => (
                                <TableRow key={history.id} data={history} />
                            ))
                        ) : (
                            <Table.Tr>
                                <Table.Td colSpan={3} className="text-center">
                                    <img src={NoAuctions} alt="No Auctions" className="w-64 h-64 mx-auto" />
                                    <p className="text-gray-500 mt-2">No bid history</p>
                                </Table.Td>
                            </Table.Tr>
                        )}
                    </tbody>
                </Table>
            </Table.ScrollContainer>
        </div>
    )
}

export default AuctionHistory