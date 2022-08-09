"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
var create_schema_1 = require("../sql/create-schema");
var MetaData_1 = require("../metadata/MetaData");
var Entity = function (name) {
    return function (target) {
        var metadata = (0, MetaData_1.getMetadata)();
        // console.log(target.name)
        metadata.tables.push({
            name: name || target.name,
            schema: (0, create_schema_1.createSchema)(metadata.columns),
            entity: target,
            primaryKey: metadata.columns.find(function (c) { return c.primaryKey; })
        });
        metadata.columns = [];
    };
};
exports.Entity = Entity;
//# sourceMappingURL=entity.js.map