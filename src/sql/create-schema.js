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
exports.createSchema = void 0;
var createSchema = function (columns) {
    return columns.reduce(function (acc, column) {
        var _a;
        return __assign(__assign({}, acc), (_a = {}, _a[column.name] = column, _a));
    }, {});
};
exports.createSchema = createSchema;
//# sourceMappingURL=create-schema.js.map