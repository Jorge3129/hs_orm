"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var entity_1 = require("../decorators/entity");
var column_1 = require("../decorators/column");
var primary_generated_column_1 = require("../decorators/primary-generated-column");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        (0, primary_generated_column_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], User.prototype, "id", void 0);
    __decorate([
        (0, column_1.Column)(),
        __metadata("design:type", String)
    ], User.prototype, "name", void 0);
    __decorate([
        (0, column_1.Column)(),
        __metadata("design:type", Date
        // @Column()
        // married: boolean
        )
    ], User.prototype, "dob", void 0);
    User = __decorate([
        (0, entity_1.Entity)('user')
    ], User);
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.js.map