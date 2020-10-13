import { Gender, WalletType } from "./common";

export interface WalletResume{
    code: string;
    user: string;
    type: WalletType;
    currency: string;
}

export interface UserResume{
    id: string;
    firstName: string;
    lastName: string;
    gender: Gender;
    email: string;
    isMerchant: boolean;
}