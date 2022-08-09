"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlResultFormatter = void 0;
var MysqlResultFormatter = /** @class */ (function () {
    function MysqlResultFormatter() {
    }
    MysqlResultFormatter.prototype.getInsertedRow = function (queryResult) {
        var result = queryResult[1][0];
        return __assign({}, result);
    };
    MysqlResultFormatter.prototype.getFindResult = function (queryResult) {
        return queryResult.map(function (row) { return (__assign({}, row)); });
    };
    return MysqlResultFormatter;
}());
exports.MysqlResultFormatter = MysqlResultFormatter;
//# sourceMappingURL=MysqlResultFormatter.js.map