"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresFindQueryGenerator = void 0;
var Query_1 = require("../../../sql/Query");
var pg_1 = require("../../../sql/constants/pg");
var PostgresFindQueryGenerator = /** @class */ (function () {
    function PostgresFindQueryGenerator() {
        this.constants = pg_1.PostgresConstants;
    }
    PostgresFindQueryGenerator.prototype.generate = function (table, options) {
        this.parameterIndex = 1;
        var escape = this.constants.kwEscape;
        var whereClause = options === null || options === void 0 ? void 0 : options.where;
        return new Query_1.Query(
        //@formatter:off
        "SELECT * FROM ".concat(escape).concat(table.name).concat(escape, " \n            ").concat(this.formatWhereClause(whereClause), ";"), 
        //@formatter:on
        this.getValues(whereClause));
    };
    PostgresFindQueryGenerator.prototype.formatWhereClause = function (whereClause) {
        if (!whereClause)
            return "";
        return "WHERE ".concat(this.formatWhere(whereClause));
    };
    PostgresFindQueryGenerator.prototype.formatWhere = function (whereClause) {
        if (Array.isArray(whereClause))
            return this.formatOr(whereClause);
        return this.formatAnd(whereClause);
    };
    PostgresFindQueryGenerator.prototype.formatAnd = function (entity, withBrackets) {
        var _this = this;
        var escape = this.constants.kwEscape;
        var result = Object.keys(entity)
            .map(function (key) { return "".concat(escape).concat(key).concat(escape, " = $").concat(_this.parameterIndex++); })
            .join(' AND ');
        return withBrackets ? "(".concat(result, ")") : result;
    };
    PostgresFindQueryGenerator.prototype.formatOr = function (whereClause) {
        var _this = this;
        return whereClause.map(function (value) { return _this.formatAnd(value, true); }).join(' OR ');
    };
    PostgresFindQueryGenerator.prototype.getValues = function (whereClause) {
        if (!whereClause)
            return [];
        if (Array.isArray(whereClause))
            return whereClause.flatMap(function (value) { return Object.values(value); });
        return Object.values(whereClause);
    };
    return PostgresFindQueryGenerator;
}());
exports.PostgresFindQueryGenerator = PostgresFindQueryGenerator;
//# sourceMappingURL=PostgresFindQueryGenerator.js.map