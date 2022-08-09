"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlDriver = void 0;
var mysql = __importStar(require("mysql"));
var MysqlQueryRunner_1 = require("./MysqlQueryRunner");
var Query_1 = require("../../sql/Query");
var MysqlSaveQueryGenerator_1 = require("./query-generator/MysqlSaveQueryGenerator");
var MysqlResultFormatter_1 = require("./query-generator/MysqlResultFormatter");
var MysqlFindQueryGenerator_1 = require("./query-generator/MysqlFindQueryGenerator");
var MysqlDriver = /** @class */ (function () {
    function MysqlDriver(dataSource) {
        this.dataSource = dataSource;
    }
    MysqlDriver.prototype.connect = function () {
        var config = this.dataSource.config;
        this.connection = mysql.createConnection({
            host: config.host,
            user: config.user || "root",
            password: config.password || "",
            database: config.database,
            multipleStatements: true
        });
        this.connection.connect();
        return Promise.resolve();
    };
    MysqlDriver.prototype.disconnect = function () {
        return Promise.resolve(undefined);
    };
    MysqlDriver.prototype.createQueryRunner = function () {
        return new MysqlQueryRunner_1.MysqlQueryRunner(this);
    };
    MysqlDriver.prototype.query = function (queryTextOrObject, values) {
        var _this = this;
        var _a = (0, Query_1.getQueryText)(queryTextOrObject), queryText = _a[0], queryValues = _a[1];
        return new Promise(function (resolve, reject) {
            _this.connection.query(queryText, queryValues, (function (err, results) {
                if (err)
                    reject(err);
                resolve(results);
            }));
        });
    };
    MysqlDriver.prototype.getQueryGenerator = function (type) {
        switch (type) {
            case "save":
                return new MysqlSaveQueryGenerator_1.MysqlSaveQueryGenerator();
            case "find":
                return new MysqlFindQueryGenerator_1.MysqlFindQueryGenerator();
            default:
                throw new Error("This query type is not supported");
        }
    };
    MysqlDriver.prototype.getResultFormatter = function () {
        return new MysqlResultFormatter_1.MysqlResultFormatter();
    };
    return MysqlDriver;
}());
exports.MysqlDriver = MysqlDriver;
//# sourceMappingURL=MysqlDriver.js.map