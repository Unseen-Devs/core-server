"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMemberInfoInput = exports.SetForgotPasswordInput = exports.ForgotPasswordInput = exports.ChangePasswordInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
let ChangePasswordInput = class ChangePasswordInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { currentPassword: { type: () => String }, newPassword: { type: () => String }, newPasswordConfirmation: { type: () => String } };
    }
};
ChangePasswordInput = __decorate([
    (0, common_1.Injectable)(),
    (0, graphql_1.InputType)()
], ChangePasswordInput);
exports.ChangePasswordInput = ChangePasswordInput;
let ForgotPasswordInput = class ForgotPasswordInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { email: { type: () => String } };
    }
};
ForgotPasswordInput = __decorate([
    (0, common_1.Injectable)(),
    (0, graphql_1.InputType)()
], ForgotPasswordInput);
exports.ForgotPasswordInput = ForgotPasswordInput;
let SetForgotPasswordInput = class SetForgotPasswordInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { code: { type: () => String }, newPassword: { type: () => String }, newPasswordConfirmation: { type: () => String } };
    }
};
SetForgotPasswordInput = __decorate([
    (0, common_1.Injectable)(),
    (0, graphql_1.InputType)()
], SetForgotPasswordInput);
exports.SetForgotPasswordInput = SetForgotPasswordInput;
let UpdateMemberInfoInput = class UpdateMemberInfoInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { firstName: { nullable: true, type: () => String }, lastName: { nullable: true, type: () => String }, age: { nullable: true, type: () => Number }, avatar: { nullable: true, type: () => String } };
    }
};
UpdateMemberInfoInput = __decorate([
    (0, common_1.Injectable)(),
    (0, graphql_1.InputType)()
], UpdateMemberInfoInput);
exports.UpdateMemberInfoInput = UpdateMemberInfoInput;
//# sourceMappingURL=member.input.js.map