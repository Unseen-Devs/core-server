"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SNSType = void 0;
const graphql_1 = require("@nestjs/graphql");
var SNSType;
(function (SNSType) {
    SNSType["KAKAO"] = "KAKAO";
    SNSType["NAVER"] = "NAVER";
    SNSType["APPLE"] = "APPLE";
    SNSType["GOOGLE"] = "GOOGLE";
    SNSType["FACEBOOK"] = "FACEBOOK";
})(SNSType = exports.SNSType || (exports.SNSType = {}));
(0, graphql_1.registerEnumType)(SNSType, {
    name: 'SNSType',
});
//# sourceMappingURL=social-auth.enum.js.map