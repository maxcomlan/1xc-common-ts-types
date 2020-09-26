/**
 * @author Maximilien Comlan
 */
import { Money } from "./common";
export declare type ID = string;
export interface InvestorData {
    id: ID;
    userId: ID;
    network: ID;
    level: number;
    timestamp: number;
}
export interface StoredInvestor extends InvestorData {
    left?: ID;
    right?: ID;
    isRoot?: boolean;
}
/**
 * Defines rewards that will be given to every investor within a network once they reach the defined level
 */
export interface LevelReward {
    level: number;
    reward: number;
}
/**
 * Defines rules aplied within an investment network
 */
export interface NetworkRule {
    currency: string;
    investment: number;
    childReward: number;
    levelReward: LevelReward[];
}
/**
 * Defines a network
 */
export interface InvestmentNetwork {
    id: ID;
    rule: NetworkRule;
    insertedAt: number;
}
/**
 * Helps to tracks every investment and their wallet source
 */
export interface InvestmentHistory {
    investment: Money;
    investorId: string;
    walletId: string;
    historyId: string;
    insertedAt: number;
}
/**
 * Helps to tracks satisfied investments from those which failed
 */
export interface JoinNetworkRequest {
    userId: string;
    networkId: string;
    referralCode: string;
    walletId: string;
    fee: Money;
    historyId: string;
    insertedAt: number;
}
interface BasicRewardHistory {
    reward: Money;
    investorId: string;
    walletId: string;
    historyId: string;
}
export interface ChildRewardHistory extends BasicRewardHistory {
    type: "child";
}
export interface LevelRewardHistory extends BasicRewardHistory {
    type: "level";
    level: number;
}
export declare type RewardHistory = ChildRewardHistory | LevelRewardHistory;
export interface ChildRewardRequest {
    type: "child";
    reward: Money;
    investor: StoredInvestor;
}
export interface LevelRewardRequest {
    type: "level";
    reward: Money;
    level: number;
    investor: StoredInvestor;
}
export declare type RewardRequest = ChildRewardRequest | LevelRewardRequest;
export {};
