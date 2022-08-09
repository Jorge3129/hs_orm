"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresSaveQueryGenerator = void 0;
var Query_1 = require("../../../sql/Query");
var pg_1 = require("../../../sql/constants/pg");
var PostgresSaveQueryGenerator = /** @class */ (function () {
    function PostgresSaveQueryGenerator() {
        this.constants = pg_1.PostgresConstants;
    }
    PostgresSaveQueryGenerator.prototype.generate = function (table, entity) {
        if (!table)
            throw new Error("Table ".concat(entity.constructor.name, " does not exist"));
        var escape = this.constants.kwEscape;
        return new Query_1.Query("INSERT INTO ".concat(escape).concat(table.name).concat(escape, " (").concat(this.formatColumnsNames(entity), ")\n           VALUES (").concat(this.getPlaceholders(entity), ") RETURNING *"), this.getValues(entity));
    };
    PostgresSaveQueryGenerator.prototype.formatColumnsNames = function (entity) {
        var escape = this.constants.kwEscape;
        return Object.keys(entity)
            .map(function (key) { return "".concat(escape).concat(key).concat(escape); })
            .join(',');
    };
    PostgresSaveQueryGenerator.prototype.getPlaceholders = function (entity) {
        var length = Object.values(entity).length;
        return new Array(length)
            .fill(0)
            .map(function (_, i) { return "$".concat(i + 1); })
            .join(",");
    };
    PostgresSaveQueryGenerator.prototype.getValues = function (entity) {
        return Object.values(entity);
    };
    return PostgresSaveQueryGenerator;
}());
exports.PostgresSaveQueryGenerator = PostgresSaveQueryGenerator;
//# sourceMappingURL=PostgresSaveQueryGenerator.js.map