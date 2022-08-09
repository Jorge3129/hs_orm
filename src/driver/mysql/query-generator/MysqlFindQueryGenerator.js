"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlFindQueryGenerator = void 0;
var Query_1 = require("../../../sql/Query");
var mysql_1 = require("../../../sql/constants/mysql");
var MysqlFindQueryGenerator = /** @class */ (function () {
    function MysqlFindQueryGenerator() {
        this.constants = mysql_1.MySQLConstants;
    }
    MysqlFindQueryGenerator.prototype.generate = function (table, options) {
        var escape = this.constants.kwEscape;
        var whereClause = options === null || options === void 0 ? void 0 : options.where;
        return new Query_1.Query(
        //@formatter:off
        "SELECT * FROM ".concat(escape).concat(table.name).concat(escape, " \n            ").concat(this.formatWhereClause(whereClause)), 
        //@formatter:on
        this.getValues(whereClause));
    };
    MysqlFindQueryGenerator.prototype.formatWhereClause = function (whereClause) {
        if (!whereClause)
            return "";
        return "WHERE ".concat(this.formatWhere(whereClause));
    };
    MysqlFindQueryGenerator.prototype.formatWhere = function (whereClause) {
        if (Array.isArray(whereClause))
            return this.formatOr(whereClause);
        return this.formatAnd(whereClause);
    };
    MysqlFindQueryGenerator.prototype.formatAnd = function (entity) {
        var escape = this.constants.kwEscape;
        var result = Object.keys(entity)
            .map(function (key) { return "".concat(escape).concat(key).concat(escape, " = ?"); })
            .join(' AND ');
        return "(".concat(result, ")");
    };
    MysqlFindQueryGenerator.prototype.formatOr = function (whereClause) {
        var _this = this;
        return whereClause.map(function (value) { return _this.formatAnd(value); }).join(' OR ');
    };
    MysqlFindQueryGenerator.prototype.getValues = function (whereClause) {
        if (!whereClause)
            return [];
        if (Array.isArray(whereClause))
            return whereClause.flatMap(function (value) { return Object.values(value); });
        return Object.values(whereClause);
    };
    return MysqlFindQueryGenerator;
}());
exports.MysqlFindQueryGenerator = MysqlFindQueryGenerator;
//# sourceMappingURL=MysqlFindQueryGenerator.js.map