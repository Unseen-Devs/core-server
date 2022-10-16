"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SocialAuthModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialAuthModule = void 0;
const common_1 = require("@nestjs/common");
const users_module_1 = require("../users/users.module");
const auth_module_1 = require("../auth/auth.module");
const social_auth_constants_1 = require("./utils/social-auth.constants");
const google_auth_service_1 = require("./libs/google/google-auth.service");
const apple_auth_service_1 = require("./libs/apple/apple-auth.service");
const kakao_auth_service_1 = require("./libs/kakao/kakao-auth.service");
const naver_auth_service_1 = require("./libs/naver/naver-auth.service");
const social_auth_service_1 = require("./services/social-auth.service");
const social_auth_mutation_resolver_1 = require("./resolvers/social-auth-mutation.resolver");
let SocialAuthModule = SocialAuthModule_1 = class SocialAuthModule {
    static forRoot(options) {
        return {
            module: SocialAuthModule_1,
            providers: [
                {
                    provide: social_auth_constants_1.SOCIAL_AUTH_MODULE_OPTIONS,
                    useValue: options,
                },
            ],
            imports: [],
        };
    }
};
SocialAuthModule = SocialAuthModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [users_module_1.UsersModule, auth_module_1.AuthModule],
        providers: [
            google_auth_service_1.GoogleAuthService,
            apple_auth_service_1.AppleAuthService,
            kakao_auth_service_1.KakaoAuthService,
            naver_auth_service_1.NaverAuthService,
            social_auth_service_1.SocialAuthService,
            social_auth_mutation_resolver_1.SocialAuthMutationResolver,
        ],
        exports: [social_auth_service_1.SocialAuthService],
    })
], SocialAuthModule);
exports.SocialAuthModule = SocialAuthModule;
//# sourceMappingURL=social-auth.module.js.map