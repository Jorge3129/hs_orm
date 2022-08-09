"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresSchemaBuilder = void 0;
var pg_1 = require("../../sql/constants/pg");
var PostgresSchemaBuilder = /** @class */ (function () {
    function PostgresSchemaBuilder() {
        this.constants = pg_1.PostgresConstants;
    }
    PostgresSchemaBuilder.createTable = function (table) {
        return new PostgresSchemaBuilder().createTable(table);
    };
    PostgresSchemaBuilder.dropTable = function (table) {
        return new PostgresSchemaBuilder().dropTable(table);
    };
    PostgresSchemaBuilder.prototype.createTable = function (table) {
        var escape = this.constants.kwEscape;
        //@formatter:off
        return "CREATE TABLE IF NOT EXISTS ".concat(escape).concat(table.name).concat(escape, "(\n").concat(this.extractColumns(table.schema), "\n);");
        //@formatter:on
    };
    PostgresSchemaBuilder.prototype.dropTable = function (table) {
        var escape = this.constants.kwEscape;
        return "DROP TABLE IF EXISTS ".concat(escape).concat(table.name).concat(escape, ";");
    };
    PostgresSchemaBuilder.prototype.extractColumns = function (schema) {
        var _this = this;
        var entries = Object.entries(schema);
        var escape = this.constants.kwEscape;
        var columns = entries.map(function (_a, i) {
            var key = _a[0], value = _a[1];
            return "".concat(escape).concat(key).concat(escape, " ").concat(_this.extractOptions(value));
        });
        return columns.join(',\n');
    };
    PostgresSchemaBuilder.prototype.extractOptions = function (column) {
        // if (column.generated) console.log(column)
        var newOptions = {
            type: column.generated ? pg_1.PostgresConstants.generated : this.getType(column.type),
            notNull: column.notNull ? "NOT NULL" : "",
            primaryKey: column.primaryKey ? "PRIMARY KEY" : "",
            autoIncrement: "",
            default: column.default !== undefined ? "DEFAULT ".concat(column.default) : "",
        };
        return Object.values(newOptions).filter(function (option) { return option; }).join(' ');
    };
    PostgresSchemaBuilder.prototype.getType = function (type, length) {
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
    return PostgresSchemaBuilder;
}());
exports.PostgresSchemaBuilder = PostgresSchemaBuilder;
//# sourceMappingURL=PostgresSchemaBuilder.js.map