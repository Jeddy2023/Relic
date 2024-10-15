/**
 * Calculates the time left from the current date to the given auction end date.
 * @param auctionEndDateString - The end date of the auction in string format.
 * @returns An object containing days, hours, minutes, and seconds left until the auction end date.
 */
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

/**
 * Formats a bid amount into a localized string with comma separators for thousands.
 * @param amount - The bid amount to be formatted.
 * @returns The formatted bid amount as a string.
 */
export function formatBidAmount(amount: number) {
    return amount.toLocaleString('en-NG', { maximumFractionDigits: 0 });
}

/**
 * Builds a query string from a given parameters object.
 * @param params - An object where keys are query parameter names and values are their corresponding values.
 * @returns A query string starting with '?' if there are parameters, otherwise an empty string.
 */
export const buildQueryString = (params: Record<string, string | number | null>): string => {
    const queryString = Object.entries(params)
        .filter(([key, value]) => value !== null && value !== '')
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string | number)}`)
        .join('&');

    return queryString ? `?${queryString}` : '';
};

/**
 * Formats a range of results for display, such as in a pagination component.
 * @param startIndex - The index of the first result in the range.
 * @param endIndex - The index of the last result in the range.
 * @param totalResults - The total number of results available.
 * @returns A string representing the range of results being shown.
 */
export const formatRange = (startIndex: number, endIndex: number, totalResults: number): string => {
    return `Showing ${startIndex}–${endIndex} of ${totalResults} results`;
};

/**
 * Handles page changes for pagination by updating the page state.
 * @param newPage - The new page number to be set.
 * @param setPage - A state setter function to update the page number.
 */
export const handlePageChange = (
    newPage: number,
    setPage: React.Dispatch<React.SetStateAction<number>>
) => {
    setPage(newPage - 1);
};

/**
 * Formats the auction end date into a human-readable string.
 * @param auctionEndDateString - The end date of the auction in string format.
 * @returns The formatted auction end date as a string. Returns an empty string if the date is invalid.
 */
export function formatAuctionEndDate(auctionEndDateString?: string): string {
    if (!auctionEndDateString) return '';

    const auctionEndDate = new Date(auctionEndDateString);
    if (isNaN(auctionEndDate.getTime())) return ''; 

    const options: Intl.DateTimeFormatOptions = {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    return auctionEndDate.toLocaleString('en-US', options);
}
