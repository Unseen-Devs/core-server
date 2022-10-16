"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppleAuthService = void 0;
const apple_auth_1 = __importDefault(require("apple-auth"));
const fs_1 = __importDefault(require("fs"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const apollo_server_1 = require("apollo-server");
const apple_constants_1 = require("./apple.constants");
class AppleAuthService {
    async getAppleUser(accessToken) {
        try {
            const auth = new apple_auth_1.default({
                client_id: apple_constants_1.APPLE_CLIENT_ID,
                team_id: apple_constants_1.APPLE_TEAM_ID,
                key_id: apple_constants_1.APPLE_KEY_ID,
                redirect_uri: apple_constants_1.APPLE_REDIRECT_URI,
                scope: apple_constants_1.APPLE_SCOPE,
            }, fs_1.default.readFileSync(apple_constants_1.APPLE_PATH_KEY).toString(), 'text');
            const response = await auth.accessToken(accessToken);
            const idToken = (0, jwt_decode_1.default)(response.id_token);
            if (!idToken || !idToken.sub || !idToken.email) {
                throw new apollo_server_1.ApolloError('login_apple_invalid_token', 'login_social');
            }
            return {
                id: idToken.sub,
                email: idToken.email,
            };
        }
        catch (err) {
            console.log(err);
            throw new apollo_server_1.ApolloError('login_apple_failure', 'login_apple_failure');
        }
    }
}
exports.AppleAuthService = AppleAuthService;
//# sourceMappingURL=apple-auth.service.js.map