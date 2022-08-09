"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlSaveQueryGenerator = void 0;
var Query_1 = require("../../../sql/Query");
var mysql_1 = require("../../../sql/constants/mysql");
var MysqlSaveQueryGenerator = /** @class */ (function () {
    function MysqlSaveQueryGenerator() {
        this.constants = mysql_1.MySQLConstants;
    }
    MysqlSaveQueryGenerator.prototype.generate = function (table, entity) {
        var _a;
        var escape = this.constants.kwEscape;
        return new Query_1.Query(
        //@formatter:off
        "INSERT INTO ".concat(escape).concat(table.name).concat(escape, " (").concat(this.formatColumnsNames(entity), ")\n           VALUES (").concat(this.getPlaceholders(entity), ");\n          SELECT *\n          FROM ").concat(escape).concat(table.name).concat(escape, "\n          WHERE ").concat(escape).concat((_a = table.primaryKey) === null || _a === void 0 ? void 0 : _a.name).concat(escape, " = LAST_INSERT_ID();"), this.getValues(entity)
        //@formatter:on
        );
    };
    MysqlSaveQueryGenerator.prototype.formatColumnsNames = function (entity) {
        var escape = this.constants.kwEscape;
        return Object.keys(entity)
            .map(function (key) { return "".concat(escape).concat(key).concat(escape); })
            .join(',');
    };
    MysqlSaveQueryGenerator.prototype.getPlaceholders = function (entity) {
        var length = Object.values(entity).length;
        return new Array(length).fill("?").join(",");
    };
    MysqlSaveQueryGenerator.prototype.getValues = function (entity) {
        return Object.values(entity);
    };
    return MysqlSaveQueryGenerator;
}());
exports.MysqlSaveQueryGenerator = MysqlSaveQueryGenerator;
//# sourceMappingURL=MysqlSaveQueryGenerator.js.map