"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthConnectionUnion = exports.SocialAuthConnection = void 0;
const eager_import_0 = require("../utils/social-auth.enum");
const graphql_1 = require("@nestjs/graphql");
const auth_connection_entity_1 = require("../../auth/entities/auth_connection.entity");
let SocialAuthConnection = class SocialAuthConnection {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => String }, provider: { type: () => require("../utils/social-auth.enum").SNSType }, email: { type: () => String }, phone_number: { nullable: true, type: () => String }, name: { nullable: true, type: () => String }, first_name: { nullable: true, type: () => String }, last_name: { nullable: true, type: () => String } };
    }
};
SocialAuthConnection = __decorate([
    (0, graphql_1.ObjectType)({
        description: 'SocialAuthConnection',
    })
], SocialAuthConnection);
exports.SocialAuthConnection = SocialAuthConnection;
exports.AuthConnectionUnion = (0, graphql_1.createUnionType)({
    name: 'AuthConnectionUnion',
    types: () => [SocialAuthConnection, auth_connection_entity_1.AuthConnection],
    resolveType: (value) => {
        if ('user' in value) {
            return auth_connection_entity_1.AuthConnection;
        }
        return SocialAuthConnection;
    },
});
//# sourceMappingURL=social-auth-connection.entity.js.map