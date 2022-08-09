"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresResultFormatter = void 0;
var PostgresResultFormatter = /** @class */ (function () {
    function PostgresResultFormatter() {
    }
    PostgresResultFormatter.prototype.getInsertedRow = function (queryResult) {
        return queryResult.rows[0];
    };
    PostgresResultFormatter.prototype.getFindResult = function (queryResult) {
        return queryResult.rows;
    };
    return PostgresResultFormatter;
}());
exports.PostgresResultFormatter = PostgresResultFormatter;
//# sourceMappingURL=PostgresResultFormatter.js.map