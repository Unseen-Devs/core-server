"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileTypeEnum = void 0;
const graphql_1 = require("@nestjs/graphql");
var FileTypeEnum;
(function (FileTypeEnum) {
    FileTypeEnum["FILE"] = "file";
    FileTypeEnum["DIR"] = "dir";
})(FileTypeEnum = exports.FileTypeEnum || (exports.FileTypeEnum = {}));
(0, graphql_1.registerEnumType)(FileTypeEnum, {
    name: 'FileType',
});
//# sourceMappingURL=file_type.js.map