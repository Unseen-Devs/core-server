"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadProvider = void 0;
const graphql_1 = require("@nestjs/graphql");
var UploadProvider;
(function (UploadProvider) {
    UploadProvider["LOCAL"] = "LOCAL";
    UploadProvider["S3"] = "S3";
})(UploadProvider = exports.UploadProvider || (exports.UploadProvider = {}));
(0, graphql_1.registerEnumType)(UploadProvider, {
    name: 'UploadProvider',
    description: 'UploadProvider',
});
//# sourceMappingURL=upload_provider.js.map