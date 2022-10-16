"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFacebookUser = void 0;
const axios_1 = __importDefault(require("axios"));
const FB = axios_1.default.create({
    baseURL: 'https://graph.facebook.com/v10.0',
});
const getFacebookUser = async (token) => {
    var _a;
    const res = await FB.get('me', {
        params: {
            access_token: token,
            fields: 'email,name,picture{url},first_name,last_name,id',
        },
    });
    return {
        id: res.data.id,
        email: res.data.email,
        first_name: res.data.first_name,
        last_name: res.data.last_name,
        name: res.data.name,
        avatar: (_a = res.data.picture) === null || _a === void 0 ? void 0 : _a.data.url,
    };
};
exports.getFacebookUser = getFacebookUser;
//# sourceMappingURL=facebook.js.map