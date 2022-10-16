"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionQueryResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const permission_entity_1 = require("../entities/permission.entity");
const permissions_1 = require("../../../helpers/permissions");
let PermissionQueryResolver = class PermissionQueryResolver {
    async permissions() {
        return permissions_1.permissions;
    }
};
__decorate([
    (0, graphql_1.Query)(() => [permission_entity_1.Permission]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PermissionQueryResolver.prototype, "permissions", null);
PermissionQueryResolver = __decorate([
    (0, graphql_1.Resolver)(() => permission_entity_1.Permission)
], PermissionQueryResolver);
exports.PermissionQueryResolver = PermissionQueryResolver;
//# sourceMappingURL=permission.query.resolver.js.map