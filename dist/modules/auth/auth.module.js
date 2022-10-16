"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AuthModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./services/auth.service");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const auth_constants_1 = require("./auth.constants");
const auth_resolver_1 = require("./resolvers/auth.resolver");
const typeorm_1 = require("@nestjs/typeorm");
const auth_repository_1 = require("./repositories/auth.repository");
let AuthModule = AuthModule_1 = class AuthModule {
    static register(options) {
        if (!(options === null || options === void 0 ? void 0 : options.secret)) {
            throw new Error('JwtStrategy requires a secret or key');
        }
        return {
            module: AuthModule_1,
            providers: [
                {
                    provide: auth_constants_1.AUTH_MODULE_OPTIONS,
                    useValue: options,
                },
                jwt_strategy_1.JwtStrategy,
                auth_service_1.AuthService,
            ],
            imports: [
                jwt_1.JwtModule.register({
                    secret: options === null || options === void 0 ? void 0 : options.secret,
                    signOptions: { expiresIn: '30 days', issuer: 'frontend' },
                }),
            ],
            exports: [auth_service_1.AuthService],
        };
    }
};
AuthModule = AuthModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [passport_1.PassportModule.register({ defaultStrategy: 'jwt' }), typeorm_1.TypeOrmModule.forFeature([auth_repository_1.AuthRepository])],
        providers: [auth_resolver_1.AuthResolver],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map