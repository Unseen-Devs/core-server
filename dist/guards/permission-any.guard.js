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
exports.PermissionAnyGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const graphql_1 = require("@nestjs/graphql");
const common_2 = require("../helpers/common");
const role_by_user_dataloader_1 = require("../modules/users/dataloaders/role-by-user.dataloader");
const allow_decorator_1 = require("./../decorators/allow.decorator");
let PermissionAnyGuard = class PermissionAnyGuard {
    constructor(reflector, roleByUserDataLoader) {
        this.reflector = reflector;
        this.roleByUserDataLoader = roleByUserDataLoader;
    }
    canActivate(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        const request = ctx.getContext().req;
        if (!(request === null || request === void 0 ? void 0 : request.user))
            return false;
        if (request.user.isSuperAdmin) {
            return true;
        }
        const roles = this.reflector.get(allow_decorator_1.PERMISSIONS_METADATA_KEY, ctx.getHandler());
        if (roles && (roles === null || roles === void 0 ? void 0 : roles.length)) {
            return this.roleByUserDataLoader.load(request.user.id).then((permissions) => {
                const roleList = permissions
                    .reduce((acc, curr) => {
                    var _a;
                    return acc.concat((_a = curr.roles) !== null && _a !== void 0 ? _a : []);
                }, [])
                    .filter(common_2.onlyUniqueString);
                return roles.some((role) => roleList.includes(role));
            });
        }
        return true;
    }
};
PermissionAnyGuard = __decorate([
    (0, common_1.Injectable)({
        scope: common_1.Scope.REQUEST,
    }),
    __metadata("design:paramtypes", [core_1.Reflector, role_by_user_dataloader_1.RoleByUserDataLoader])
], PermissionAnyGuard);
exports.PermissionAnyGuard = PermissionAnyGuard;
//# sourceMappingURL=permission-any.guard.js.map