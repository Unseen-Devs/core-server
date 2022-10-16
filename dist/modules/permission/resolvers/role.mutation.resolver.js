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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleMutationResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const permission_service_1 = require("../services/permission.service");
const role_entity_1 = require("../entities/role.entity");
const new_role_input_1 = require("../dto/new_role.input");
const common_decorator_1 = require("../../../decorators/common.decorator");
let RoleMutationResolver = class RoleMutationResolver {
    constructor(permissionService) {
        this.permissionService = permissionService;
    }
    createRole(input) {
        return this.permissionService.create(input);
    }
    updateRole(_a) {
        var { id } = _a, rest = __rest(_a, ["id"]);
        return this.permissionService.update(id, rest);
    }
    deleteRole(id) {
        return this.permissionService.remove(id);
    }
    async addUsersToRole(input) {
        try {
            const role = await this.permissionService.addUsersToRole(input.roleId, input.userIds);
            return role;
        }
        catch (err) {
            throw err;
        }
    }
    async removeUsersToRole(input) {
        try {
            const role = await this.permissionService.removeUsersToRole(input.roleId, input.userIds);
            return role;
        }
        catch (err) {
            throw err;
        }
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => role_entity_1.Role, {
        description: 'Require `CREATE_ROLE` permission',
    }),
    (0, common_decorator_1.Allow)('CREATE_ROLE'),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [new_role_input_1.NewRoleInput]),
    __metadata("design:returntype", void 0)
], RoleMutationResolver.prototype, "createRole", null);
__decorate([
    (0, graphql_1.Mutation)(() => role_entity_1.Role, {
        description: 'Require `UPDATE_ROLE` permission',
    }),
    (0, common_decorator_1.Allow)('UPDATE_ROLE'),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [new_role_input_1.EditRoleInput]),
    __metadata("design:returntype", void 0)
], RoleMutationResolver.prototype, "updateRole", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, {
        description: 'Require `DELETE_ROLE` permission',
    }),
    (0, common_decorator_1.Allow)('DELETE_ROLE'),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RoleMutationResolver.prototype, "deleteRole", null);
__decorate([
    (0, graphql_1.Mutation)(() => role_entity_1.Role, {
        description: 'Require `UPDATE_ROLE` permission',
    }),
    (0, common_decorator_1.Allow)('UPDATE_ROLE'),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [new_role_input_1.AddUsersToRoleInput]),
    __metadata("design:returntype", Promise)
], RoleMutationResolver.prototype, "addUsersToRole", null);
__decorate([
    (0, graphql_1.Mutation)(() => role_entity_1.Role, {
        description: 'Require `UPDATE_ROLE` permission',
    }),
    (0, common_decorator_1.Allow)('UPDATE_ROLE'),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [new_role_input_1.AddUsersToRoleInput]),
    __metadata("design:returntype", Promise)
], RoleMutationResolver.prototype, "removeUsersToRole", null);
RoleMutationResolver = __decorate([
    (0, graphql_1.Resolver)(() => role_entity_1.Role),
    __metadata("design:paramtypes", [permission_service_1.PermissionService])
], RoleMutationResolver);
exports.RoleMutationResolver = RoleMutationResolver;
//# sourceMappingURL=role.mutation.resolver.js.map