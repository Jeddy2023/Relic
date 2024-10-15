export enum Gender {
    Female,
    Male,
    Other
}

export interface User {
    id: number
    firstName: string;
    username: string;
    email: string;
    role: string;
    isBlocked: boolean
    isVerified: boolean;
    shopname: string
}

export interface Product {
    id: number;
    name: string;
    imageUrls: string[];
    condition: string;
    shortDescription: string;
    description: string;
    currentBid: number;
    biddingTimeLimit: string;
    vendorShopName: string;
    vendorId: number;
    productImageUrl: string;
    minimumBid: number;
    createdAt: string;
    numberOfBids: number;
    averageRating: number;
    categoryId: number;
    categoryName: string;
    winningBidderId: number | null;
    winningBidderTrophy: boolean;
}

export interface Category {
    id: number;
    name: string;
    productCount: number;
}