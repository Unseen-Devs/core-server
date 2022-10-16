"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = exports.PERMISSIONS_METADATA_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.PERMISSIONS_METADATA_KEY = '__permissions__';
const Roles = (...permissions) => (0, common_1.SetMetadata)(exports.PERMISSIONS_METADATA_KEY, permissions);
exports.Roles = Roles;
//# sourceMappingURL=allow.decorator.js.map