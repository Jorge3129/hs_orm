"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MysqlFindQueryGenerator_1 = require("../../../../src/driver/mysql/query-generator/MysqlFindQueryGenerator");
describe('MysqlFindQueryGenerator test', function () {
    var generator = new MysqlFindQueryGenerator_1.MysqlFindQueryGenerator();
    test('formatWhere with object', function () {
        var actual = generator.formatWhere({ name: "Andrew", age: 10 });
        expect(actual).toBe("(`name` = ? AND `age` = ?)");
    });
    test('formatWhere with array', function () {
        var actual = generator.formatWhere([
            { name: "Andrew", age: 10 },
            { city: "London", address: "Time Square" },
        ]);
        expect(actual).toBe("(`name` = ? AND `age` = ?) OR (`city` = ? AND `address` = ?)");
    });
    test('getValues with object', function () {
        var actual = generator.getValues({ name: "Andrew", age: 10 });
        expect(actual).toEqual(["Andrew", 10]);
    });
    test('getValues with array', function () {
        var actual = generator.getValues([
            { name: "Andrew", age: 10 },
            { city: "London", address: "Time Square" },
        ]);
        expect(actual).toEqual(["Andrew", 10, "London", "Time Square"]);
    });
});
//# sourceMappingURL=MysqlFindQueryGenerator.test.js.map
