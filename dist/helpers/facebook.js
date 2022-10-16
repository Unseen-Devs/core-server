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
    const res = await FB.get('me', {
        params: {
            access_token: token,
            fields: 'email,picture{url},first_name,last_name,id',
        },
    });
    return res.data;
};
exports.getFacebookUser = getFacebookUser;
//# sourceMappingURL=facebook.js.map