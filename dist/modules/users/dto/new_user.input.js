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
exports.UpdateUserInput = exports.NewUserInput = void 0;
const class_validator_1 = require("class-validator");
const graphql_1 = require("@nestjs/graphql");
const UniqueEmail_1 = require("../validators/UniqueEmail");
let NewUserInput = class NewUserInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { email: { type: () => String }, password: { type: () => String }, firstName: { nullable: true, type: () => String }, lastName: { nullable: true, type: () => String }, avatar: { nullable: true, type: () => String }, isActive: { nullable: true, type: () => Boolean }, age: { nullable: true, type: () => Number }, roles: { nullable: true, type: () => [String] } };
    }
};
__decorate([
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.Validate)(UniqueEmail_1.UniqueEmail, {
        message: 'Email must be unique',
    }),
    __metadata("design:type", String)
], NewUserInput.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], NewUserInput.prototype, "age", void 0);
NewUserInput = __decorate([
    (0, graphql_1.InputType)()
], NewUserInput);
exports.NewUserInput = NewUserInput;
let UpdateUserInput = class UpdateUserInput extends (0, graphql_1.PartialType)((0, graphql_1.OmitType)(NewUserInput, ['email'])) {
    static _GRAPHQL_METADATA_FACTORY() {
        return {};
    }
};
UpdateUserInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateUserInput);
exports.UpdateUserInput = UpdateUserInput;
//# sourceMappingURL=new_user.input.js.map