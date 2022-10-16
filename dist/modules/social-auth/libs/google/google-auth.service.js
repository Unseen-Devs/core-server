"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleAuthService = void 0;
const googleapis_1 = require("googleapis");
const apollo_server_1 = require("apollo-server");
class GoogleAuthService {
    async getGGUser(accessToken) {
        const oauth2Client = new googleapis_1.google.auth.OAuth2();
        oauth2Client.setCredentials({ access_token: accessToken });
        try {
            const oauth2 = googleapis_1.google.oauth2({
                auth: oauth2Client,
                version: 'v2',
            });
            const res = await oauth2.userinfo.get();
            const { data } = res;
            if (!data.id || !data.email) {
                throw new apollo_server_1.ApolloError('login_google_required_email', 'login_social');
            }
            return {
                id: data.id,
                email: data === null || data === void 0 ? void 0 : data.email,
                name: data === null || data === void 0 ? void 0 : data.name,
                first_name: data === null || data === void 0 ? void 0 : data.given_name,
                last_name: data === null || data === void 0 ? void 0 : data.family_name,
            };
        }
        catch (err) {
            throw new apollo_server_1.ApolloError('login_google_failure', 'login_social');
        }
    }
}
exports.GoogleAuthService = GoogleAuthService;
//# sourceMappingURL=google-auth.service.js.map