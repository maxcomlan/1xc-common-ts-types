"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceEngine = void 0;
class PriceUtils {
    static isHigherThan(value1, value2, strict = true) {
        if (value1 === value2) {
            return !strict;
        }
        else if (value1 === '+inf') {
            return true;
        }
        else if (value2 === '+inf') {
            return false;
        }
        else if (value1 === '-inf') {
            return false;
        }
        else if (value2 === '-inf') {
            return true;
        }
        return value1 > value2;
    }
    static isLowerThan(value1, value2, strict = true) {
        if (value1 === value2) {
            return !strict;
        }
        else if (value1 === '+inf') {
            return false;
        }
        else if (value2 === '+inf') {
            return true;
        }
        else if (value1 === '-inf') {
            return true;
        }
        else if (value2 === '-inf') {
            return false;
        }
        return value1 < value2;
    }
    static isEqual(value1, value2) {
        if (value1 === value2) {
            return true;
        }
        return false;
    }
}
class PriceEngine {
    constructor(steps) {
        this.priceLine = steps;
    }
    get isEmpty() {
        return this.priceLine.length == 0;
    }
    get size() {
        return this.priceLine.length;
    }
    get isNegativeInfinite() {
        return this.priceLine.findIndex((s) => s.step === "-inf");
    }
    get isPositiveInfinite() {
        return this.priceLine.findIndex((s) => s.step === "-inf") != -1;
    }
    get isAtLeastInfinite() {
        return this.priceLine.findIndex((s) => s.step === "-inf" || s.step === "+inf") != -1;
    }
    get isFullInfinite() {
        return this.isNegativeInfinite && this.isPositiveInfinite;
    }
    get isBounded() {
        return !this.isNegativeInfinite && !this.isPositiveInfinite;
    }
    get highestStep() {
        if (this.isEmpty) {
            return null;
        }
        if (this.priceLine.length == 1) {
            return this.priceLine[0];
        }
        let highest = this.priceLine[this.priceLine.length - 1];
        for (let i = 0; i < this.priceLine.length - 1; i++) {
            let current = this.priceLine[i];
            if (PriceUtils.isHigherThan(current.step, highest.step)) {
                highest = current;
            }
        }
        return highest;
    }
    get lowestStep() {
        if (this.isEmpty) {
            return null;
        }
        if (this.priceLine.length == 1) {
            return this.priceLine[0];
        }
        let lowest = this.priceLine[this.priceLine.length - 1];
        for (let i = 0; i < this.priceLine.length - 1; i++) {
            let current = this.priceLine[i];
            if (PriceUtils.isLowerThan(current.step, lowest.step)) {
                lowest = current;
            }
        }
        return lowest;
    }
    sortAscendant() {
        this.priceLine.sort((s1, s2) => {
            if (s1.step === s2.step) {
                return 0;
            }
            else if (PriceUtils.isLowerThan(s1.step, s2.step)) {
                return -1;
            }
            return 1;
        });
        return this;
    }
    appendStep(step) {
        if (this.isEmpty) {
            this.priceLine.push(step);
        }
        else {
            let exists = this.priceLine.findIndex((s) => s.step === step.step);
            if (exists === -1) {
                this.priceLine.push(step);
            }
            else {
                this.priceLine[exists] = step;
            }
            this.sortAscendant();
        }
        return this;
    }
    removeStep(step) {
        this.priceLine = this.priceLine.filter((s) => s.step !== step.step);
        return this;
    }
    getPriceRangeForPrice(price) {
        this.sortAscendant();
        if (this.size === 0) {
            return null;
        }
        else if (this.size === 1) {
            let single = this.priceLine[0];
            if (PriceUtils.isHigherThan(single.step, price)) {
                return single;
            }
            return null;
        }
        let cage = this.priceLine[0];
        for (let i = 1; i < this.size; i++) {
            let nextStep = this.priceLine[i];
            if (PriceUtils.isHigherThan(nextStep.step, price)
                && PriceUtils.isLowerThan(cage.step, price, true)) {
                return nextStep;
            }
            cage = nextStep;
            continue;
        }
        return cage;
    }
    calculateDeduction(price) {
        let range = this.getPriceRangeForPrice(price);
        if (range) {
            let { amount, merchant, type } = range.config;
            if (type === "fixed") {
                let merchantFee = parseFloat((amount * merchant / 100).toFixed(2));
                return {
                    total: amount,
                    merchant: merchantFee,
                    system: amount - merchantFee,
                    rest: price - amount
                };
            }
            else {
                let deduction = parseFloat((price * amount / 100).toFixed(2));
                let merchantFee = parseFloat((deduction * merchant / 100).toFixed(2));
                return {
                    total: deduction,
                    merchant: merchantFee,
                    system: amount - merchantFee,
                    rest: price - deduction
                };
            }
        }
        return {
            total: 0,
            merchant: 0,
            system: 0,
            rest: price
        };
    }
    get clone() {
        return new PriceEngine(this.priceLine);
    }
}
exports.PriceEngine = PriceEngine;
