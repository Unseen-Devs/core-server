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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const auth_service_1 = require("../services/auth.service");
const common_decorator_1 = require("../../../decorators/common.decorator");
const users_entity_1 = require("../../users/entities/users.entity");
const auth_connection_entity_1 = require("../entities/auth_connection.entity");
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const dayjs_1 = __importDefault(require("dayjs"));
const login_input_1 = require("../dto/login.input");
const member_entity_1 = require("../../users/entities/member.entity");
let AuthResolver = class AuthResolver {
    constructor(authService) {
        this.authService = authService;
    }
    meAdmin(user) {
        return user;
    }
    me(user) {
        return user;
    }
    async login(input, ctx) {
        const data = await this.authService.login(input.username, input.password);
        ctx.res.cookie('token', data.accessToken, {
            expires: (0, dayjs_1.default)((0, jwt_decode_1.default)(data.accessToken).exp * 1000).toDate(),
            sameSite: true,
            httpOnly: true,
        });
        return data;
    }
    async loginAdmin(input, ctx) {
        const data = await this.authService.loginAdmin(input.username, input.password);
        ctx.res.cookie('token', data.accessToken, {
            expires: (0, dayjs_1.default)((0, jwt_decode_1.default)(data.accessToken).exp * 1000).toDate(),
            sameSite: true,
            httpOnly: true,
        });
        return data;
    }
    async logout(ctx) {
        ctx.res.clearCookie('token');
        return true;
    }
};
__decorate([
    (0, graphql_1.Query)(() => users_entity_1.User),
    (0, common_decorator_1.Authenticated)(),
    __param(0, (0, common_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_entity_1.User]),
    __metadata("design:returntype", void 0)
], AuthResolver.prototype, "meAdmin", null);
__decorate([
    (0, graphql_1.Query)(() => member_entity_1.Member),
    (0, common_decorator_1.Authenticated)(),
    __param(0, (0, common_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [member_entity_1.Member]),
    __metadata("design:returntype", void 0)
], AuthResolver.prototype, "me", null);
__decorate([
    (0, graphql_1.Mutation)(() => auth_connection_entity_1.AuthConnection),
    __param(0, (0, graphql_1.Args)('input', { type: () => login_input_1.LoginInput, nullable: false })),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_input_1.LoginInput, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
__decorate([
    (0, graphql_1.Mutation)(() => auth_connection_entity_1.AdminAuthConnection),
    __param(0, (0, graphql_1.Args)('input', { type: () => login_input_1.LoginInput, nullable: false })),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_input_1.LoginInput, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "loginAdmin", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "logout", null);
AuthResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthResolver);
exports.AuthResolver = AuthResolver;
//# sourceMappingURL=auth.resolver.js.map