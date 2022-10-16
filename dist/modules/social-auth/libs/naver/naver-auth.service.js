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
exports.NaverAuthService = void 0;
const axios_1 = __importDefault(require("axios"));
const apollo_server_1 = require("apollo-server");
const naver_constants_1 = require("./naver.constants");
class NaverAuthService {
    async getNaverUser(accessToken) {
        try {
            const res = await axios_1.default.get(naver_constants_1.NAVER_DOMAIN, {
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                },
            });
            if (res.status !== 200) {
                throw new apollo_server_1.ApolloError('login_naver_failure', 'login_social');
            }
            const _a = res.data.response, { id, email } = _a, user = __rest(_a, ["id", "email"]);
            return Object.assign({ id,
                email }, user);
        }
        catch (err) {
            console.log(err);
            throw new apollo_server_1.ApolloError('login_naver_failure', 'login_social');
        }
    }
}
exports.NaverAuthService = NaverAuthService;
//# sourceMappingURL=naver-auth.service.js.map