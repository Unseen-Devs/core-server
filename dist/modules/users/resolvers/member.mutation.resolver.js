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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberMutationResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const register_input_1 = require("../dto/register.input");
const activate_user_input_1 = require("../dto/activate-user.input");
const member_entity_1 = require("../entities/member.entity");
const member_service_1 = require("../services/member.service");
const member_input_1 = require("../dto/member.input");
const common_decorator_1 = require("../../../decorators/common.decorator");
let MemberMutationResolver = class MemberMutationResolver {
    constructor(memberService) {
        this.memberService = memberService;
    }
    register(input) {
        return this.memberService.register(input);
    }
    activateUser(input) {
        return this.memberService.activate(input.email, input.code);
    }
    forgotPassword(input) {
        return this.memberService.requestForgotPassword(input.email);
    }
    setForgotPassword(input) {
        return this.memberService.setForgotPassword(input.code, input.newPassword);
    }
    updateInfo(input, id) {
        return this.memberService.updateInfo(id, input);
    }
    changePassword(input, id) {
        return this.memberService.changePassword(id, input.currentPassword, input.newPassword);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => member_entity_1.Member),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_input_1.RegisterInput]),
    __metadata("design:returntype", void 0)
], MemberMutationResolver.prototype, "register", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [activate_user_input_1.ActivateUserInput]),
    __metadata("design:returntype", void 0)
], MemberMutationResolver.prototype, "activateUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [member_input_1.ForgotPasswordInput]),
    __metadata("design:returntype", void 0)
], MemberMutationResolver.prototype, "forgotPassword", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [member_input_1.SetForgotPasswordInput]),
    __metadata("design:returntype", void 0)
], MemberMutationResolver.prototype, "setForgotPassword", null);
__decorate([
    (0, graphql_1.Mutation)(() => member_entity_1.Member),
    (0, common_decorator_1.Authenticated)(),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, common_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [member_input_1.UpdateMemberInfoInput, String]),
    __metadata("design:returntype", void 0)
], MemberMutationResolver.prototype, "updateInfo", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, common_decorator_1.Authenticated)(),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, common_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [member_input_1.ChangePasswordInput, String]),
    __metadata("design:returntype", void 0)
], MemberMutationResolver.prototype, "changePassword", null);
MemberMutationResolver = __decorate([
    (0, graphql_1.Resolver)(() => member_entity_1.Member),
    __metadata("design:paramtypes", [member_service_1.MemberService])
], MemberMutationResolver);
exports.MemberMutationResolver = MemberMutationResolver;
//# sourceMappingURL=member.mutation.resolver.js.map