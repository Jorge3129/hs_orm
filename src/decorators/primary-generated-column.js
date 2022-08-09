"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrimaryGeneratedColumn = void 0;
var MetaData_1 = require("../metadata/MetaData");
function PrimaryGeneratedColumn() {
    return function (target, key) {
        var t = Reflect.getMetadata("design:type", target, key);
        if (t.name !== "Number")
            throw new Error('PrimaryGeneratedColumn must be numeric');
        // console.log("  " + t.name)
        var column = Object.assign({
            name: key,
            type: t.name,
            primaryKey: true,
            generated: true
        });
        (0, MetaData_1.getMetadata)().columns.push(column);
    };
}
exports.PrimaryGeneratedColumn = PrimaryGeneratedColumn;
//# sourceMappingURL=primary-generated-column.js.map