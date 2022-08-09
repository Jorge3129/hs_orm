"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlSchemaBuilder = void 0;
var mysql_1 = require("../../sql/constants/mysql");
var MysqlSchemaBuilder = /** @class */ (function () {
    function MysqlSchemaBuilder() {
        this.constants = mysql_1.MySQLConstants;
    }
    MysqlSchemaBuilder.createTable = function (table) {
        return new MysqlSchemaBuilder().createTable(table);
    };
    MysqlSchemaBuilder.dropTable = function (table) {
        return new MysqlSchemaBuilder().dropTable(table);
    };
    MysqlSchemaBuilder.prototype.createTable = function (table) {
        var escape = this.constants.kwEscape;
        //@formatter:off
        return "CREATE TABLE IF NOT EXISTS ".concat(escape).concat(table.name).concat(escape, "(\n").concat(this.extractColumns(table.schema), "\n);");
        //@formatter:on
    };
    MysqlSchemaBuilder.prototype.dropTable = function (table) {
        var escape = this.constants.kwEscape;
        return "DROP TABLE IF EXISTS ".concat(escape).concat(table.name).concat(escape, ";");
    };
    MysqlSchemaBuilder.prototype.extractColumns = function (schema) {
        var _this = this;
        var entries = Object.entries(schema);
        var escape = this.constants.kwEscape;
        var columns = entries.map(function (_a, i) {
            var key = _a[0], value = _a[1];
            return "".concat(escape).concat(key).concat(escape, " ").concat(_this.extractOptions(value));
        });
        return columns.join(',\n');
    };
    MysqlSchemaBuilder.prototype.extractOptions = function (column) {
        var newOptions = {
            type: this.getType(column.type),
            notNull: column.notNull ? "NOT NULL" : "",
            primaryKey: column.primaryKey ? "PRIMARY KEY" : "",
            autoIncrement: column.generated || column.autoIncrement ? "AUTO_INCREMENT" : "",
            default: column.default !== undefined ? "DEFAULT ".concat(column.default) : "",
        };
        return Object.values(newOptions).filter(function (option) { return option; }).join(' ');
    };
    MysqlSchemaBuilder.prototype.getType = function (type, length) {
        switch (type) {
            case "String":
                return "VARCHAR(".concat(length || this.constants.defaultLength, ")");
            case "Number":
                return "INT";
            case "Date":
                return "DATE";
            case "Boolean":
                return "BOOLEAN";
            default:
                throw new Error("This type is not supported yet");
        }
    };
    return MysqlSchemaBuilder;
}());
exports.MysqlSchemaBuilder = MysqlSchemaBuilder;
//# sourceMappingURL=MysqlSchemaBuilder.js.map