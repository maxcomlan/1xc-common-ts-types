"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PriceEngine = void 0;

var PriceUtils = /*#__PURE__*/function () {
  function PriceUtils() {
    _classCallCheck(this, PriceUtils);
  }

  _createClass(PriceUtils, null, [{
    key: "isHigherThan",
    value: function isHigherThan(value1, value2) {
      var strict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      if (value1 === value2) {
        return !strict;
      } else if (value1 === '+inf') {
        return true;
      } else if (value2 === '+inf') {
        return false;
      } else if (value1 === '-inf') {
        return false;
      } else if (value2 === '-inf') {
        return true;
      }

      return value1 > value2;
    }
  }, {
    key: "isLowerThan",
    value: function isLowerThan(value1, value2) {
      var strict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      if (value1 === value2) {
        return !strict;
      } else if (value1 === '+inf') {
        return false;
      } else if (value2 === '+inf') {
        return true;
      } else if (value1 === '-inf') {
        return true;
      } else if (value2 === '-inf') {
        return false;
      }

      return value1 < value2;
    }
  }, {
    key: "isEqual",
    value: function isEqual(value1, value2) {
      if (value1 === value2) {
        return true;
      }

      return false;
    }
  }]);

  return PriceUtils;
}();

var PriceEngine = /*#__PURE__*/function () {
  function PriceEngine(steps) {
    _classCallCheck(this, PriceEngine);

    _defineProperty(this, "priceLine", []);

    this.priceLine = steps;
  }

  _createClass(PriceEngine, [{
    key: "isEmpty",
    get: function get() {
      return this.priceLine.length == 0;
    }
  }, {
    key: "size",
    get: function get() {
      return this.priceLine.length;
    }
  }, {
    key: "isNegativeInfinite",
    get: function get() {
      return this.priceLine.findIndex(function (s) {
        return s.step === "-inf";
      });
    }
  }, {
    key: "isPositiveInfinite",
    get: function get() {
      return this.priceLine.findIndex(function (s) {
        return s.step === "-inf";
      }) != -1;
    }
  }, {
    key: "isAtLeastInfinite",
    get: function get() {
      return this.priceLine.findIndex(function (s) {
        return s.step === "-inf" || s.step === "+inf";
      }) != -1;
    }
  }, {
    key: "isFullInfinite",
    get: function get() {
      return this.isNegativeInfinite && this.isPositiveInfinite;
    }
  }, {
    key: "isBounded",
    get: function get() {
      return !this.isNegativeInfinite && !this.isPositiveInfinite;
    }
  }, {
    key: "highestStep",
    get: function get() {
      if (this.isEmpty) {
        return null;
      }

      if (this.priceLine.length == 1) {
        return this.priceLine[0];
      }

      var highest = this.priceLine[this.priceLine.length - 1];

      for (var i = 0; i < this.priceLine.length - 1; i++) {
        var current = this.priceLine[i];

        if (PriceUtils.isHigherThan(current.step, highest.step)) {
          highest = current;
        }
      }

      return highest;
    }
  }, {
    key: "lowestStep",
    get: function get() {
      if (this.isEmpty) {
        return null;
      }

      if (this.priceLine.length == 1) {
        return this.priceLine[0];
      }

      var lowest = this.priceLine[this.priceLine.length - 1];

      for (var i = 0; i < this.priceLine.length - 1; i++) {
        var current = this.priceLine[i];

        if (PriceUtils.isLowerThan(current.step, lowest.step)) {
          lowest = current;
        }
      }

      return lowest;
    }
  }, {
    key: "sortAscendant",
    value: function sortAscendant() {
      this.priceLine.sort(function (s1, s2) {
        if (s1.step === s2.step) {
          return 0;
        } else if (PriceUtils.isLowerThan(s1.step, s2.step)) {
          return -1;
        }

        return 1;
      });
      return this;
    }
  }, {
    key: "appendStep",
    value: function appendStep(step) {
      if (this.isEmpty) {
        this.priceLine.push(step);
      } else {
        var exists = this.priceLine.findIndex(function (s) {
          return s.step === step.step;
        });

        if (exists === -1) {
          this.priceLine.push(step);
        } else {
          this.priceLine[exists] = step;
        }

        this.sortAscendant();
      }

      return this;
    }
  }, {
    key: "removeStep",
    value: function removeStep(step) {
      this.priceLine = this.priceLine.filter(function (s) {
        return s.step !== step.step;
      });
      return this;
    }
  }, {
    key: "getPriceRangeForPrice",
    value: function getPriceRangeForPrice(price) {
      this.sortAscendant();

      if (this.size === 0) {
        return null;
      } else if (this.size === 1) {
        var single = this.priceLine[0];

        if (PriceUtils.isHigherThan(single.step, price)) {
          return single;
        }

        return null;
      }

      var cage = this.priceLine[0];

      for (var i = 1; i < this.size; i++) {
        var nextStep = this.priceLine[i];

        if (PriceUtils.isHigherThan(nextStep.step, price) && PriceUtils.isLowerThan(cage.step, price, true)) {
          return nextStep;
        }

        cage = nextStep;
        continue;
      }

      return cage;
    }
  }, {
    key: "calculateDeduction",
    value: function calculateDeduction(price) {
      var range = this.getPriceRangeForPrice(price);

      if (range) {
        var _range$config = range.config,
            amount = _range$config.amount,
            merchant = _range$config.merchant,
            type = _range$config.type;

        if (type === "fixed") {
          var merchantFee = parseFloat((amount * merchant / 100).toFixed(2));
          return {
            total: amount,
            merchant: merchantFee,
            system: amount - merchantFee,
            rest: price - amount
          };
        } else {
          var deduction = parseFloat((price * amount / 100).toFixed(2));

          var _merchantFee = parseFloat((deduction * merchant / 100).toFixed(2));

          return {
            total: deduction,
            merchant: _merchantFee,
            system: amount - _merchantFee,
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
  }, {
    key: "clone",
    get: function get() {
      return new PriceEngine(this.priceLine);
    }
  }]);

  return PriceEngine;
}();

exports.PriceEngine = PriceEngine;