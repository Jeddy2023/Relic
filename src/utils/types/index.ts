export enum Gender {
    Female,
    Male,
    Other
}

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    isAdmin: boolean;
    isVerified: boolean;
    isTokenized: boolean
}
