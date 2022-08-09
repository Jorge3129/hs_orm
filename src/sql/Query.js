"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQueryText = exports.isQuery = exports.Query = void 0;
var Query = /** @class */ (function () {
    function Query(statement, values) {
        this.statement = statement;
        this.values = values;
    }
    return Query;
}());
exports.Query = Query;
var isQuery = function (query) {
    return typeof query === "object" && "statement" in query;
};
exports.isQuery = isQuery;
var getQueryText = function (queryTextOrObject, values) {
    return (0, exports.isQuery)(queryTextOrObject) ? [queryTextOrObject.statement, queryTextOrObject.values] : [queryTextOrObject, values];
};
exports.getQueryText = getQueryText;
//# sourceMappingURL=Query.js.map