"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Column = void 0;
require("reflect-metadata");
var MetaData_1 = require("../metadata/MetaData");
var convertOptions = function (options) {
    return {
        notNull: !!(options === null || options === void 0 ? void 0 : options.notNull),
        autoIncrement: !!(options === null || options === void 0 ? void 0 : options.autoIncrement),
        primaryKey: !!(options === null || options === void 0 ? void 0 : options.primaryKey),
        default: options === null || options === void 0 ? void 0 : options.default,
    };
};
function Column(options) {
    return function (target, key) {
        var t = Reflect.getMetadata("design:type", target, key);
        // console.log("  " + t.name)
        var column = Object.assign({
            name: key,
            type: t.name
            //@ts-ignore
        }, convertOptions(options));
        //@ts-ignore
        (0, MetaData_1.getMetadata)().columns.push(column);
    };
}
exports.Column = Column;
//# sourceMappingURL=column.js.map