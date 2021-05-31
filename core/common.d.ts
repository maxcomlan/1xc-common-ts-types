import { NetworkRule } from "./investor";
import { PriceStep } from "./pricing";
import { ScopedRole } from "./roles";
interface Indexable {
    id: string;
}
interface Patchable {
    updatedAt: number;
}
interface Insertable {
    insertedAt: number;
}
export interface Money {
    amount: number;
    currency: string;
}
export interface TransfertProperties {
    pricings: {
        [key: string]: PriceStep[];
    };
}
export interface SystemProperties {
    wallets: {
        businessAccountFee: Money;
        allowedCurrencies: string[];
    };
    investment?: NetworkRule;
    transfert?: TransfertProperties;
}
export interface OnlineApiAccount {
    publicKey: string;
    privateKey: string;
}
export interface CoinbaseAccount extends OnlineApiAccount {
}
export interface FedaPayAccount extends OnlineApiAccount {
}
export interface PerfectMoneyAccount {
    accountId: string;
    passphrase: string;
    alternatePassphrase: string;
}
export declare type MethodAccountType = "perfectmoney" | "coinbase" | "fedapay";
export interface MethodAccount extends Indexable {
    type: MethodAccountType;
    details: OnlineApiAccount | FedaPayAccount | CoinbaseAccount | PerfectMoneyAccount;
}
export interface KeyValue {
    [key: string]: any;
}
export declare type Gender = "male" | "female";
export declare type UserStatus = "active" | "disabled";
export interface User extends Indexable, Insertable, Patchable {
    firstName: string;
    lastName: string;
    gender: Gender;
    email: string;
    passwordHash?: string;
}
export interface AccountVerificationCode extends Indexable {
    userId: string;
    code: string;
}
export interface Customer extends User {
    status: UserStatus;
    country: string;
    verified: boolean;
    isMerchant: boolean;
}
export declare type WalletType = "business" | "standard";
export interface Wallet extends Indexable, Insertable, Patchable {
    userId: string;
    type: WalletType;
    balance: Money;
    isMain: boolean;
}
export declare type WalletHistoryType = "commission" | "normal";
export interface WalletHistory extends Indexable, Insertable, Money {
    type: WalletHistoryType;
    walletId: string;
    memo: string;
}
export interface WalletRegistrationEntry extends Indexable, Insertable {
    userId: string;
    walletId: string;
    sourceWalletId: string;
    historyId: string;
    fee: Money;
}
export interface WalletTransfer extends Indexable, Insertable {
    sender: {
        id: string;
        wallet: string;
        type: WalletType;
    };
    receiver: {
        id: string;
        wallet: string;
        type: WalletType;
    };
    appliedRate: number;
    sent: Money;
    received: Money;
    fees: Money;
    earning?: Money;
    proofs: {
        sender: string;
        receiver: string;
    };
    status: "completed";
    reason?: string;
}
export interface Admin extends Indexable, Insertable {
    firstName: string;
    lastName: string;
    gender: Gender;
    alias: string;
    passwordHash?: string;
    status: "active" | "disabled";
    genesis: boolean;
}
export interface AdminWithRoles {
    profile: Admin;
    roles: ScopedRole[];
}
export declare type DocType = "cni" | "ifu" | "rc";
export interface Document {
    docType: DocType;
    fileType: string;
    name: string;
    verified: boolean;
}
export declare type BusinessProfileStatus = "pending" | "verified" | "rejected";
export interface BusinessProfile extends Indexable, Insertable, Patchable {
    name: string;
    userId: string;
    country: string;
    city: string;
    phone: string;
    email: string;
    documents: Document[];
    verificationDate?: number;
    status: BusinessProfileStatus;
    corrections?: IBusinessCorrection[];
}
export interface IBusinessCorrection {
    title: String;
    content: String;
    submittedAt: number;
}
export declare type MethodCategory = "banking" | "card" | "mobile" | "transfer" | "cryptocurrency";
export interface AmountLimitation {
    minAmount: number;
    maxAmount: number;
    staticFee: number;
    dynamicFee: number;
    emitterFee: number;
    percentage: number;
    pattern: string;
}
export interface BankingDetails extends AmountLimitation {
    currency: string;
    account: string;
}
export interface MobileDetails extends AmountLimitation {
    address: string;
    currency: string;
    country: string;
    entranceFee?: {
        static: number;
        dynamic: number;
    };
}
export interface TransferDetails extends AmountLimitation {
    currency: string;
}
export interface CardDetails extends AmountLimitation {
    currency: string;
    country: string;
}
export interface CryptoCurrencyDetails extends AmountLimitation {
}
export declare type MethodDetails = BankingDetails | CardDetails | MobileDetails | TransferDetails | CryptoCurrencyDetails;
export interface Method extends Indexable, Insertable, Patchable {
    category: MethodCategory;
    type: string;
    label: string;
    icon: string;
    color?: string;
    allowSell: boolean;
    allowBuy: boolean;
    availableAmount?: number;
    addedAt?: number;
    details: MethodDetails;
}
export declare type TicketStatus = "pending" | "confirmed" | "cancelled" | "paid";
export interface CardRechargeData {
    holder: string;
    identifier: string;
}
export interface Ticket extends Indexable {
    id: string;
    userId: string;
    source: Method;
    dest: Method;
    amount: number;
    rate: number;
    address: string;
    card?: CardRechargeData;
    allowed: boolean;
    enableCommission: boolean;
    status: TicketStatus;
    emissionDate: number;
    confirmedAt?: number;
    paidAt?: number;
    cancelledAt?: number;
}
export interface TicketPayment extends Indexable, Money {
    ticketId: string;
    type: string;
    address: string;
    paymentUrl: string;
}
export declare type TxType = "in" | "out";
export declare type TxStatus = "pending" | "done";
export interface Transaction extends Indexable, Insertable {
    ticketId: string;
    variant: TxType;
    type: string;
    amount: number;
    currency: string;
    source: string;
    dest: string;
    reference: string;
    status: TxStatus;
    insertedAt: number;
    validatedAt?: number;
}
export interface ExchangeCalculation {
    source: string;
    dest: string;
    rate: number;
    amount: number;
    converted: number;
    rateApplied: number;
}
export interface AccessToken extends Insertable, Patchable {
    hash: string;
    owner: string;
    rules: string[];
}
export * from './investor';
export * from './roles';
