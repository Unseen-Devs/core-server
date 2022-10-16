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
exports.JwtStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const auth_constants_1 = require("../auth.constants");
const auth_service_1 = require("../services/auth.service");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(authService, options) {
        super({
            jwtFromRequest: (req) => {
                var _a, _b, _c;
                return (_c = (_a = req.cookies.token) !== null && _a !== void 0 ? _a : (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1]) !== null && _c !== void 0 ? _c : req.query.access_token;
            },
            ignoreExpiration: false,
            secretOrKey: options.secret,
            passReqToCallback: true,
        });
        this.authService = authService;
        this.options = options;
        this.validate = async (req) => {
            var _a, _b, _c, _d;
            const accessToken = (_d = (_a = req.cookies.token) !== null && _a !== void 0 ? _a : (_c = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')) === null || _c === void 0 ? void 0 : _c[1]) !== null && _d !== void 0 ? _d : req.query.access_token;
            if (!accessToken) {
                throw new common_1.UnauthorizedException();
            }
            try {
                const user = await this.authService.getUserByToken(accessToken);
                return user;
            }
            catch (err) {
                throw new common_1.UnauthorizedException();
            }
        };
    }
};
JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(auth_constants_1.AUTH_MODULE_OPTIONS)),
    __metadata("design:paramtypes", [auth_service_1.AuthService, Object])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;
//# sourceMappingURL=jwt.strategy.js.map