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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../../users/services/users.service");
const auth_repository_1 = require("../repositories/auth.repository");
const apollo_server_1 = require("apollo-server");
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const common_2 = require("../../../helpers/common");
const member_service_1 = require("../../users/services/member.service");
let AuthService = class AuthService {
    constructor(usersService, memberService, jwtService, authRepository) {
        this.usersService = usersService;
        this.memberService = memberService;
        this.jwtService = jwtService;
        this.authRepository = authRepository;
    }
    async findOne(conditions) {
        return await this.authRepository.findOne(conditions);
    }
    async validateAdminUser(username, pass) {
        const user = await this.usersService.login(username, pass);
        if (user) {
            const { password, passwordSalt } = user, result = __rest(user, ["password", "passwordSalt"]);
            return result;
        }
        else {
            throw new Error('User not found');
        }
    }
    async validateUser(username, pass) {
        const user = await this.memberService.login(username, pass);
        if (user) {
            const { password, passwordSalt } = user, result = __rest(user, ["password", "passwordSalt"]);
            return result;
        }
        else {
            throw new Error('User not found');
        }
    }
    async loginAdmin(username, password) {
        const user = await this.validateAdminUser(username, password);
        if (!user) {
            throw new apollo_server_1.ApolloError('Error');
        }
        if (!user.isActive) {
            throw new apollo_server_1.UserInputError('User not active');
        }
        try {
            const authToken = await this.saveAuthToken(user.id, user.email, {
                issuer: 'admin',
                audience: ['app'],
            });
            if (!authToken) {
                throw new apollo_server_1.ApolloError('Error');
            }
            return {
                user,
                accessToken: authToken === null || authToken === void 0 ? void 0 : authToken.accessToken,
                refreshToken: authToken === null || authToken === void 0 ? void 0 : authToken.refreshToken,
            };
        }
        catch (err) {
            throw new apollo_server_1.ApolloError('Error');
        }
    }
    async login(username, password) {
        const user = await this.validateUser(username, password);
        if (!user) {
            throw new apollo_server_1.ApolloError('Error');
        }
        if (!user.isActive) {
            throw new apollo_server_1.UserInputError('User not active');
        }
        try {
            const authToken = await this.saveAuthToken(user.id, user.email, {
                issuer: 'frontend',
                audience: ['app'],
            });
            if (!authToken) {
                throw new apollo_server_1.ApolloError('Error');
            }
            return {
                user,
                accessToken: authToken === null || authToken === void 0 ? void 0 : authToken.accessToken,
                refreshToken: authToken === null || authToken === void 0 ? void 0 : authToken.refreshToken,
            };
        }
        catch (err) {
            throw new apollo_server_1.ApolloError('Error');
        }
    }
    initAccessToken(data) {
        const { payload, options } = data;
        return {
            accessToken: this.jwtService.sign(payload, Object.assign(Object.assign({}, options), { expiresIn: `30 days` })),
            refreshToken: this.jwtService.sign(payload, Object.assign(Object.assign({}, options), { expiresIn: `35 days` })),
        };
    }
    async saveAuthToken(userId, username, options) {
        const { accessToken, refreshToken } = this.initAccessToken({
            payload: {
                sub: userId,
                username,
            },
            options,
        });
        return { accessToken, refreshToken };
    }
    async createToken(data) {
        const authToken = this.authRepository.create(Object.assign({ id: common_2.snowflake.nextId() }, data));
        const newAuthToken = await this.authRepository.save(authToken);
        return await this.authRepository.findOne({
            where: {
                id: newAuthToken.id,
            },
        });
    }
    async refreshToken(refreshToken) {
        try {
            const currentPayload = await this.jwtService.verifyAsync(refreshToken, {
                ignoreExpiration: false,
            });
            const token = await this.authRepository.findOne({ where: { refreshToken } });
            if (!token) {
                throw new apollo_server_1.ApolloError('invalid_token');
            }
            const decoded = (0, jwt_decode_1.default)(token.accessToken);
            const decodedRefreshToken = (0, jwt_decode_1.default)(token.refreshToken);
            const payload = {
                username: currentPayload.username,
                sub: currentPayload.sub,
            };
            const refreshPayload = {
                username: currentPayload.username,
                sub: currentPayload.sub,
            };
            token.accessToken = this.jwtService.sign(payload, {
                expiresIn: `30 days`,
                issuer: decoded.iss,
                audience: decoded.aud,
            });
            token.refreshToken = this.jwtService.sign(refreshPayload, {
                expiresIn: `35 days`,
                issuer: decodedRefreshToken.iss,
                audience: decodedRefreshToken.aud,
            });
            const newToken = await this.updateToken(token);
            const user = this.usersService.findByEmail(currentPayload.username);
            if (newToken) {
                return {
                    user,
                    accessToken: newToken.accessToken,
                    refreshToken: newToken.refreshToken,
                };
            }
        }
        catch (error) {
            throw new apollo_server_1.ApolloError('invalid_token');
        }
    }
    async updateToken(data) {
        if (data.id) {
            delete data.updatedAt;
            await this.authRepository.update(data.id, data);
            return await this.authRepository.findOne({
                where: { id: data.id },
            });
        }
    }
    getUserByToken(token) {
        const decode = (0, jwt_decode_1.default)(token);
        if (decode.iss === 'admin') {
            return this.usersService.findActiveUser(decode.username);
        }
        else {
            return this.memberService.findActiveUser(decode.username);
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        member_service_1.MemberService,
        jwt_1.JwtService,
        auth_repository_1.AuthRepository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map