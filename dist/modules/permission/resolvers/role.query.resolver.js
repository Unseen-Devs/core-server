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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleQueryResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const permission_service_1 = require("../services/permission.service");
const role_entity_1 = require("../entities/role.entity");
const user_by_role_dataloader_1 = require("../dataloaders/user-by-role.dataloader");
const users_entity_1 = require("../../users/entities/users.entity");
const role_dataloader_1 = require("../dataloaders/role.dataloader");
const common_decorator_1 = require("../../../decorators/common.decorator");
const permissions_1 = require("../../../helpers/permissions");
const common_args_1 = require("../../../graphql/types/common.args");
let RoleQueryResolver = class RoleQueryResolver {
    constructor(permissionService, userByRoleDataLoader, roleDataLoader) {
        this.permissionService = permissionService;
        this.userByRoleDataLoader = userByRoleDataLoader;
        this.roleDataLoader = roleDataLoader;
    }
    async roles(args) {
        return this.permissionService.pagination(args);
    }
    async role(id) {
        return this.roleDataLoader.load(id);
    }
    async users(role) {
        return this.userByRoleDataLoader.load(role.id);
    }
    async rolesField(role) {
        var _a;
        return (_a = role.roles) === null || _a === void 0 ? void 0 : _a.filter((v) => permissions_1.permissionKeys.includes(v));
    }
};
__decorate([
    (0, graphql_1.Query)(() => role_entity_1.RoleConnection, { nullable: true, description: 'Require `LIST_ROLE` permission' }),
    (0, common_decorator_1.Allow)('LIST_ROLE'),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_args_1.PaginationArgs]),
    __metadata("design:returntype", Promise)
], RoleQueryResolver.prototype, "roles", null);
__decorate([
    (0, graphql_1.Query)(() => role_entity_1.Role, { nullable: true, description: 'Require `LIST_ROLE` permission' }),
    (0, common_decorator_1.Allow)('LIST_ROLE'),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoleQueryResolver.prototype, "role", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [users_entity_1.User], {
        nullable: true,
    }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_entity_1.Role]),
    __metadata("design:returntype", Promise)
], RoleQueryResolver.prototype, "users", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [String], {
        nullable: true,
        name: 'roles',
    }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_entity_1.Role]),
    __metadata("design:returntype", Promise)
], RoleQueryResolver.prototype, "rolesField", null);
RoleQueryResolver = __decorate([
    (0, graphql_1.Resolver)(() => role_entity_1.Role),
    __metadata("design:paramtypes", [permission_service_1.PermissionService,
        user_by_role_dataloader_1.UserByRoleDataLoader,
        role_dataloader_1.RoleDataLoader])
], RoleQueryResolver);
exports.RoleQueryResolver = RoleQueryResolver;
//# sourceMappingURL=role.query.resolver.js.map