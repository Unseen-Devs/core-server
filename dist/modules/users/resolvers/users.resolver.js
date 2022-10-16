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
exports.UsersResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const users_service_1 = require("../services/users.service");
const users_entity_1 = require("../entities/users.entity");
const role_by_user_dataloader_1 = require("../dataloaders/role-by-user.dataloader");
const common_decorator_1 = require("../../../decorators/common.decorator");
const common_args_1 = require("../../../graphql/types/common.args");
const role_entity_1 = require("../../permission/entities/role.entity");
const common_1 = require("../../../helpers/common");
const permissions_1 = require("../../../helpers/permissions");
let UsersResolver = class UsersResolver {
    constructor(userService, roleByUserDataLoader) {
        this.userService = userService;
        this.roleByUserDataLoader = roleByUserDataLoader;
    }
    users(args) {
        return this.userService.pagination(args);
    }
    fullName(user) {
        var _a;
        return `${user.firstName} ${(_a = user.lastName) !== null && _a !== void 0 ? _a : ''}`;
    }
    avatar(user) {
        var _a;
        return (_a = user.avatar) !== null && _a !== void 0 ? _a : 'https://st.quantrimang.com/photos/image/2017/04/08/anh-dai-dien-FB-200.jpg';
    }
    roles(user) {
        return this.roleByUserDataLoader.load(user.id);
    }
    async permissions(user) {
        const roles = await this.roleByUserDataLoader.load(user.id).then((p) => p
            .reduce((acc, curr) => {
            var _a;
            return acc.concat((_a = curr.roles) !== null && _a !== void 0 ? _a : []);
        }, [])
            .filter(common_1.onlyUniqueString));
        return roles.filter((v) => permissions_1.permissionKeys.includes(v));
    }
};
__decorate([
    (0, graphql_1.Query)(() => users_entity_1.UserConnection, {
        name: 'users',
        nullable: true,
        description: 'Require `LIST_USER` permission',
    }),
    (0, common_decorator_1.AllowAny)('LIST_USER'),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_args_1.PaginationArgs]),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "users", null);
__decorate([
    (0, graphql_1.ResolveField)(() => String, {
        nullable: true,
    }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_entity_1.User]),
    __metadata("design:returntype", String)
], UsersResolver.prototype, "fullName", null);
__decorate([
    (0, graphql_1.ResolveField)(() => String, {
        nullable: true,
    }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_entity_1.User]),
    __metadata("design:returntype", String)
], UsersResolver.prototype, "avatar", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [role_entity_1.Role], {
        nullable: true,
    }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_entity_1.User]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "roles", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [String], {
        nullable: true,
    }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_entity_1.User]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "permissions", null);
UsersResolver = __decorate([
    (0, graphql_1.Resolver)(() => users_entity_1.User),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        role_by_user_dataloader_1.RoleByUserDataLoader])
], UsersResolver);
exports.UsersResolver = UsersResolver;
//# sourceMappingURL=users.resolver.js.map