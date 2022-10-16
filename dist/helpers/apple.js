"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppleUser = void 0;
const axios_1 = __importDefault(require("axios"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
const apollo_server_errors_1 = require("apollo-server-errors");
const common_1 = require("@nestjs/common");
const request = axios_1.default.create({
    baseURL: 'https://appleid.apple.com',
});
const generateSecret = () => {
    if (!process.env.APPLE_KEY_PATH || !process.env.APPLE_CLIENT_ID || !process.env.APPLE_KEY_ID)
        return undefined;
    if (!fs_1.default.existsSync(process.env.APPLE_KEY_PATH)) {
        throw new common_1.NotFoundException('Apple Key Path not exists.');
    }
    return new Promise((resolve, reject) => {
        const exp = Math.floor(Date.now() / 1000) + 86400 * 180;
        const privateKey = fs_1.default.readFileSync(process.env.APPLE_KEY_PATH, { encoding: 'utf8' });
        const claims = {
            iss: process.env.APPLE_TEAM_ID,
            iat: Math.floor(Date.now() / 1000),
            exp,
            aud: 'https://appleid.apple.com',
            sub: process.env.APPLE_CLIENT_ID,
        };
        jsonwebtoken_1.default.sign(claims, privateKey, {
            algorithm: 'ES256',
            keyid: process.env.APPLE_KEY_ID,
        }, (err, token) => {
            if (err) {
                reject('AppleAuth Error – Error occurred while signing: ' + err);
                return;
            }
            resolve(token);
        });
    });
};
const getAppleUser = async (token) => {
    const secret = await generateSecret();
    if (!secret) {
        throw new apollo_server_errors_1.ApolloError('create_secret_error', 'create_secret_error');
    }
    const res = await request.post('auth/token', {
        grant_type: 'authorization_code',
        code: token,
        redirect_uri: process.env.APPLE_REDIRECT_URI,
        client_id: process.env.APPLE_CLIENT_ID,
        client_secret: secret,
    });
    const idToken = jsonwebtoken_1.default.decode(res.data.id_token);
    if (idToken && typeof idToken === 'object') {
        const user = {
            sub: idToken.sub ? idToken.sub : '',
            email: idToken === null || idToken === void 0 ? void 0 : idToken.email,
        };
        return user;
    }
    else {
        throw new apollo_server_errors_1.ApolloError('invalid_token', 'invalid_token');
    }
};
exports.getAppleUser = getAppleUser;
//# sourceMappingURL=apple.js.map