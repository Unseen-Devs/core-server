"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthConnection = exports.AdminAuthConnection = void 0;
const eager_import_0 = require("../../users/entities/users.entity");
const eager_import_1 = require("../../users/entities/member.entity");
const graphql_1 = require("@nestjs/graphql");
let AdminAuthConnection = class AdminAuthConnection {
    static _GRAPHQL_METADATA_FACTORY() {
        return { accessToken: { type: () => String }, refreshToken: { type: () => String }, user: { type: () => require("../../users/entities/users.entity").User } };
    }
};
AdminAuthConnection = __decorate([
    (0, graphql_1.ObjectType)({
        description: 'AdminAuthConnection',
    })
], AdminAuthConnection);
exports.AdminAuthConnection = AdminAuthConnection;
let AuthConnection = class AuthConnection {
    static _GRAPHQL_METADATA_FACTORY() {
        return { accessToken: { type: () => String }, refreshToken: { type: () => String }, user: { type: () => require("../../users/entities/member.entity").Member } };
    }
};
AuthConnection = __decorate([
    (0, graphql_1.ObjectType)({
        description: 'AuthConnection',
    })
], AuthConnection);
exports.AuthConnection = AuthConnection;
//# sourceMappingURL=auth_connection.entity.js.map