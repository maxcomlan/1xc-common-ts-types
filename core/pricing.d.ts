export declare type PriceValue = '-inf' | number | '+inf';
export declare type PriceType = 'fixed' | 'percentage';
export interface PriceConfig {
    type: PriceType;
    amount: number;
    merchant: number;
}
export interface PriceStep {
    step: PriceValue;
    config: PriceConfig;
}
export interface CurrencyPricing {
    currency: String;
    pricing: PriceStep[];
}
export interface PriceDeduction {
    total: number;
    merchant: number;
    system: number;
    rest: number;
}
export declare class PriceEngine {
    priceLine: PriceStep[];
    constructor(steps: PriceStep[]);
    get isEmpty(): boolean;
    get size(): number;
    get isNegativeInfinite(): number;
    get isPositiveInfinite(): boolean;
    get isAtLeastInfinite(): boolean;
    get isFullInfinite(): boolean | 0;
    get isBounded(): boolean;
    get highestStep(): PriceStep | null;
    get lowestStep(): PriceStep | null;
    sortAscendant(): this;
    appendStep(step: PriceStep): this;
    removeStep(step: PriceStep): this;
    getPriceRangeForPrice(price: number): PriceStep | null;
    calculateDeduction(price: number): PriceDeduction;
    get clone(): PriceEngine;
}
