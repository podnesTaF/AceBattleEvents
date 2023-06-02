export interface IUser {
    id: number;
    name: string;
    email: string;
    surname: string;
    club?: string;
    city: string;
    country: string;
    balance: number;
    token: string;
}