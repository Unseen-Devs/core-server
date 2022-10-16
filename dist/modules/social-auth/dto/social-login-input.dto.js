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
exports.SNSLoginInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const social_auth_enum_1 = require("../utils/social-auth.enum");
const class_validator_1 = require("class-validator");
let SNSLoginInput = class SNSLoginInput {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], SNSLoginInput.prototype, "snsToken", void 0);
__decorate([
    (0, graphql_1.Field)(() => social_auth_enum_1.SNSType),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SNSLoginInput.prototype, "snsType", void 0);
SNSLoginInput = __decorate([
    (0, graphql_1.InputType)()
], SNSLoginInput);
exports.SNSLoginInput = SNSLoginInput;
//# sourceMappingURL=social-login-input.dto.js.map