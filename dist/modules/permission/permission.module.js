"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const role_entity_1 = require("./entities/role.entity");
const permission_service_1 = require("./services/permission.service");
const role_repository_1 = require("./repositories/role.repository");
const role_query_resolver_1 = require("./resolvers/role.query.resolver");
const role_mutation_resolver_1 = require("./resolvers/role.mutation.resolver");
const role_dataloader_1 = require("./dataloaders/role.dataloader");
const permission_query_resolver_1 = require("./resolvers/permission.query.resolver");
const user_by_role_dataloader_1 = require("./dataloaders/user-by-role.dataloader");
let PermissionModule = class PermissionModule {
};
PermissionModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([role_entity_1.Role, role_repository_1.RoleRepository])],
        providers: [
            permission_service_1.PermissionService,
            role_query_resolver_1.RoleQueryResolver,
            role_mutation_resolver_1.RoleMutationResolver,
            permission_query_resolver_1.PermissionQueryResolver,
            role_dataloader_1.RoleDataLoader,
            user_by_role_dataloader_1.UserByRoleDataLoader,
        ],
        exports: [permission_service_1.PermissionService],
    })
], PermissionModule);
exports.PermissionModule = PermissionModule;
//# sourceMappingURL=permission.module.js.map