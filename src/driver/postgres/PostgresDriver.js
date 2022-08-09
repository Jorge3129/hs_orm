"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresDriver = void 0;
var pg_1 = require("pg");
var PostgresQueryRunner_1 = require("./PostgresQueryRunner");
var Query_1 = require("../../sql/Query");
var PostgresSaveQueryGenerator_1 = require("./query-generator/PostgresSaveQueryGenerator");
var PostgresResultFormatter_1 = require("./query-generator/PostgresResultFormatter");
var PostgresFindQueryGenerator_1 = require("./query-generator/PostgresFindQueryGenerator");
var PostgresDriver = /** @class */ (function () {
    function PostgresDriver(dataSource) {
        this.dataSource = dataSource;
    }
    PostgresDriver.prototype.getQueryGenerator = function (type) {
        switch (type) {
            case "save":
                return new PostgresSaveQueryGenerator_1.PostgresSaveQueryGenerator();
            case "find":
                return new PostgresFindQueryGenerator_1.PostgresFindQueryGenerator();
            default:
                throw new Error("This query type is not supported");
        }
    };
    PostgresDriver.prototype.connect = function () {
        var config = this.dataSource.config;
        this.connection = new pg_1.Client({
            host: config.host,
            user: config.user || "postgres",
            password: config.password || "",
            database: config.database,
            port: config.port || 5432
        });
        return this.connection.connect();
    };
    PostgresDriver.prototype.disconnect = function () {
        return this.connection.end();
    };
    PostgresDriver.prototype.createQueryRunner = function () {
        return new PostgresQueryRunner_1.PostgresQueryRunner(this);
    };
    PostgresDriver.prototype.query = function (queryTextOrObject, values) {
        var _a = (0, Query_1.getQueryText)(queryTextOrObject), queryText = _a[0], queryValues = _a[1];
        // console.log(queryText)
        // if (queryValues) console.log(queryValues)
        return this.connection.query(queryText, queryValues);
    };
    PostgresDriver.prototype.getResultFormatter = function () {
        return new PostgresResultFormatter_1.PostgresResultFormatter();
    };
    return PostgresDriver;
}());
exports.PostgresDriver = PostgresDriver;
//# sourceMappingURL=PostgresDriver.js.map