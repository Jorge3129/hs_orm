"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverFactory = void 0;
var MysqlDriver_1 = require("./mysql/MysqlDriver");
var PostgresDriver_1 = require("./postgres/PostgresDriver");
var DriverFactory = /** @class */ (function () {
    function DriverFactory() {
    }
    DriverFactory.prototype.create = function (dataSource) {
        switch (dataSource.config.type) {
            case "mysql":
                return new MysqlDriver_1.MysqlDriver(dataSource);
            case "postgres":
                return new PostgresDriver_1.PostgresDriver(dataSource);
        }
    };
    return DriverFactory;
}());
exports.DriverFactory = DriverFactory;
//# sourceMappingURL=DriverFactory.js.map