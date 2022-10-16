"use strict";
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
exports.KakaoAuthService = void 0;
const axios_1 = __importDefault(require("axios"));
const apollo_server_1 = require("apollo-server");
const kakao_constants_1 = require("./kakao.constants");
class KakaoAuthService {
    async getKakaoUser(accessToken) {
        try {
            const res = await axios_1.default.get(kakao_constants_1.KAKAO_DOMAIN, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (res.status !== 200) {
                throw new apollo_server_1.ApolloError('login_kakao_failure', 'login_social');
            }
            const _a = res.data, { id } = _a, _b = _a.kakao_account, { profile, email } = _b, account = __rest(_b, ["profile", "email"]);
            return Object.assign({ id,
                email, name: profile.nickname }, account);
        }
        catch (err) {
            console.log(err);
            throw new apollo_server_1.ApolloError('login_kakao_failure', 'login_social');
        }
    }
}
exports.KakaoAuthService = KakaoAuthService;
//# sourceMappingURL=kakao-auth.service.js.map