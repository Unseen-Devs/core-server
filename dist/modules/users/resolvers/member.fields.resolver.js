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
exports.MemberFieldsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const member_entity_1 = require("../entities/member.entity");
let MemberFieldsResolver = class MemberFieldsResolver {
    fullName(user) {
        var _a;
        return `${user.firstName} ${(_a = user.lastName) !== null && _a !== void 0 ? _a : ''}`;
    }
    avatar(user) {
        var _a;
        return (_a = user.avatar) !== null && _a !== void 0 ? _a : 'https://st.quantrimang.com/photos/image/2017/04/08/anh-dai-dien-FB-200.jpg';
    }
};
__decorate([
    (0, graphql_1.ResolveField)(() => String, {
        nullable: true,
    }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [member_entity_1.Member]),
    __metadata("design:returntype", String)
], MemberFieldsResolver.prototype, "fullName", null);
__decorate([
    (0, graphql_1.ResolveField)(() => String, {
        nullable: true,
    }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [member_entity_1.Member]),
    __metadata("design:returntype", String)
], MemberFieldsResolver.prototype, "avatar", null);
MemberFieldsResolver = __decorate([
    (0, graphql_1.Resolver)(() => member_entity_1.Member)
], MemberFieldsResolver);
exports.MemberFieldsResolver = MemberFieldsResolver;
//# sourceMappingURL=member.fields.resolver.js.map