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
exports.SocialAuthMutationResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const dayjs_1 = __importDefault(require("dayjs"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const social_auth_service_1 = require("../services/social-auth.service");
const social_login_input_dto_1 = require("../dto/social-login-input.dto");
const auth_connection_entity_1 = require("../../auth/entities/auth_connection.entity");
let SocialAuthMutationResolver = class SocialAuthMutationResolver {
    constructor(socialAuthService) {
        this.socialAuthService = socialAuthService;
    }
    async loginBySocial(input, ctx) {
        const { snsToken, snsType } = input;
        const data = await this.socialAuthService.loginBySocial(snsToken, snsType);
        if (data.accessToken) {
            ctx.res.cookie('token', data.accessToken, {
                expires: (0, dayjs_1.default)((0, jwt_decode_1.default)(data.accessToken).exp * 1000).toDate(),
                sameSite: false,
                httpOnly: true,
            });
        }
        if (data.refreshToken) {
            ctx.res.cookie('refreshToken', data.refreshToken, {
                expires: (0, dayjs_1.default)((0, jwt_decode_1.default)(data.refreshToken).exp * 1000).toDate(),
                sameSite: false,
                httpOnly: true,
            });
        }
        return data;
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => auth_connection_entity_1.AuthConnection),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [social_login_input_dto_1.SNSLoginInput, Object]),
    __metadata("design:returntype", Promise)
], SocialAuthMutationResolver.prototype, "loginBySocial", null);
SocialAuthMutationResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [social_auth_service_1.SocialAuthService])
], SocialAuthMutationResolver);
exports.SocialAuthMutationResolver = SocialAuthMutationResolver;
//# sourceMappingURL=social-auth-mutation.resolver.js.map