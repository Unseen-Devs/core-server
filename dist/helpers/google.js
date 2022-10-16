"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGGUser = void 0;
const googleapis_1 = require("googleapis");
const getGGUser = async (token) => {
    const OAuth2 = googleapis_1.google.auth.OAuth2;
    const oauth2Client = new OAuth2();
    oauth2Client.setCredentials({ access_token: token });
    const oauth2 = googleapis_1.google.oauth2({
        auth: oauth2Client,
        version: 'v2',
    });
    const res = await oauth2.userinfo.get();
    return res.data;
};
exports.getGGUser = getGGUser;
//# sourceMappingURL=google.js.map