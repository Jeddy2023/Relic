export function calculateTimeLeft(auctionEndDateString: string | null) {
    if (!auctionEndDateString) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    const auctionEndDate = new Date(auctionEndDateString);
    const now = new Date();

    let difference = auctionEndDate.getTime() - now.getTime();
    if (difference < 0) difference = 0;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
}

export function formatBidAmount(amount: number) {
    return amount.toLocaleString('en-NG', { maximumFractionDigits: 0 });
}

export const buildQueryString = (params: Record<string, string | number | null>): string => {
    const queryString = Object.entries(params)
        .filter(([key, value]) => value !== null && value !== '')
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string | number)}`)
        .join('&');

    return queryString ? `?${queryString}` : '';
};

export const formatRange = (startIndex: number, endIndex: number, totalResults: number): string => {
    return `Showing ${startIndex}–${endIndex} of ${totalResults} results`;
};

export const handlePageChange = (
    newPage: number,
    setPage: React.Dispatch<React.SetStateAction<number>>
) => {
    setPage(newPage - 1);
};