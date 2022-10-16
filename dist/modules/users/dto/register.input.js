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
exports.RegisterInput = void 0;
const class_validator_1 = require("class-validator");
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const UniqueMemberEmail_1 = require("../validators/UniqueMemberEmail");
let RegisterInput = class RegisterInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { firstName: { type: () => String }, lastName: { type: () => String }, email: { type: () => String }, password: { type: () => String } };
    }
};
__decorate([
    (0, class_validator_1.MinLength)(6),
    (0, class_validator_1.Validate)(UniqueMemberEmail_1.UniqueMemberEmail, {
        message: 'Email must be unique',
    }),
    __metadata("design:type", String)
], RegisterInput.prototype, "email", void 0);
RegisterInput = __decorate([
    (0, common_1.Injectable)(),
    (0, graphql_1.InputType)()
], RegisterInput);
exports.RegisterInput = RegisterInput;
//# sourceMappingURL=register.input.js.map