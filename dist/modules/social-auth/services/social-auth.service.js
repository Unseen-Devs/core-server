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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialAuthService = void 0;
const apollo_server_1 = require("apollo-server");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../../auth/services/auth.service");
const google_auth_service_1 = require("../libs/google/google-auth.service");
const apple_auth_service_1 = require("../libs/apple/apple-auth.service");
const kakao_auth_service_1 = require("../libs/kakao/kakao-auth.service");
const naver_auth_service_1 = require("../libs/naver/naver-auth.service");
const social_auth_enum_1 = require("../utils/social-auth.enum");
const member_service_1 = require("../../users/services/member.service");
const facebook_1 = require("../libs/facebook/facebook");
let SocialAuthService = class SocialAuthService {
    constructor(authService, memberService, googleAuthService, appleAuthService, kakaoAuthService, naverAuthService) {
        this.authService = authService;
        this.memberService = memberService;
        this.googleAuthService = googleAuthService;
        this.appleAuthService = appleAuthService;
        this.kakaoAuthService = kakaoAuthService;
        this.naverAuthService = naverAuthService;
    }
    async loginBySocial(accessToken, provider) {
        let socialUser = { id: '', email: '' };
        if (provider === social_auth_enum_1.SNSType.KAKAO) {
            socialUser = await this.kakaoAuthService.getKakaoUser(accessToken);
        }
        else if (provider === social_auth_enum_1.SNSType.NAVER) {
            socialUser = await this.naverAuthService.getNaverUser(accessToken);
        }
        else if (provider === social_auth_enum_1.SNSType.GOOGLE) {
            socialUser = await this.googleAuthService.getGGUser(accessToken);
        }
        else if (provider === social_auth_enum_1.SNSType.APPLE) {
            socialUser = await this.appleAuthService.getAppleUser(accessToken);
        }
        else if (provider === social_auth_enum_1.SNSType.FACEBOOK) {
            socialUser = await (0, facebook_1.getFacebookUser)(accessToken);
        }
        if (!socialUser.id || !socialUser.email) {
            throw new apollo_server_1.ApolloError('login_social_invalid', 'login_social');
        }
        return await this.authenticate(Object.assign(Object.assign({}, socialUser), { provider }));
    }
    async authenticate(socialUser) {
        const { id, provider, email, first_name, last_name, avatar } = socialUser;
        let member;
        try {
            member = await this.memberService.findOne({
                where: {
                    provider,
                    email: email,
                },
            });
        }
        catch (err) {
            member = await this.memberService.create({
                email,
                avatar: avatar !== null && avatar !== void 0 ? avatar : undefined,
                firstName: first_name !== null && first_name !== void 0 ? first_name : undefined,
                lastName: last_name !== null && last_name !== void 0 ? last_name : undefined,
                providerId: id,
                provider,
                isActive: true,
            });
        }
        if (!member) {
            throw new common_1.NotFoundException('User Not Found');
        }
        if (!(member === null || member === void 0 ? void 0 : member.isActive)) {
            throw new apollo_server_1.ApolloError('User Not Active', 'login_social', {
                user_not_active: 'user_not_active',
            });
        }
        const { password, passwordSalt } = member, result = __rest(member, ["password", "passwordSalt"]);
        try {
            const authToken = await this.authService.saveAuthToken(result.id, result.email, {
                issuer: 'frontend',
                audience: ['app'],
            });
            if (!authToken) {
                throw new apollo_server_1.ApolloError('Create token error', 'login_social', {
                    user_not_create_token: 'user_not_create_token',
                });
            }
            return {
                user: result,
                accessToken: authToken.accessToken,
                refreshToken: authToken.refreshToken,
            };
        }
        catch (err) {
            throw new apollo_server_1.ApolloError(err.message, 'login_social', {
                login_failure: 'login_failure',
            });
        }
    }
};
SocialAuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        member_service_1.MemberService,
        google_auth_service_1.GoogleAuthService,
        apple_auth_service_1.AppleAuthService,
        kakao_auth_service_1.KakaoAuthService,
        naver_auth_service_1.NaverAuthService])
], SocialAuthService);
exports.SocialAuthService = SocialAuthService;
//# sourceMappingURL=social-auth.service.js.map