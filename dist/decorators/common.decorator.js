"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllowAny = exports.Allow = exports.Authenticated = exports.CurrentUserRest = exports.CurrentUser = exports.GraphQLInfo = exports.AcceptLang = void 0;
const common_1 = require("@nestjs/common");
const gql_auth_guard_1 = require("../guards/gql-auth.guard");
const allow_decorator_1 = require("./allow.decorator");
const permission_guard_1 = require("../guards/permission.guard");
const permission_any_guard_1 = require("../guards/permission-any.guard");
exports.AcceptLang = (0, common_1.createParamDecorator)((_data, host) => {
    var _a;
    const [, , ctx] = host.getArgs();
    return ((_a = ctx === null || ctx === void 0 ? void 0 : ctx.req) === null || _a === void 0 ? void 0 : _a.acceptsLanguages(['en', 'vi'])) || 'en';
});
exports.GraphQLInfo = (0, common_1.createParamDecorator)((_data, host) => {
    const [, , , info] = host.getArgs();
    return info;
});
exports.CurrentUser = (0, common_1.createParamDecorator)((field, host) => {
    var _a;
    const [, , ctx] = host.getArgs();
    const user = (_a = ctx === null || ctx === void 0 ? void 0 : ctx.req) === null || _a === void 0 ? void 0 : _a.user;
    if (user && field)
        return user[field];
    return user;
});
exports.CurrentUserRest = (0, common_1.createParamDecorator)((field, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    if (user && field)
        return user[field];
    return user;
});
const Authenticated = () => {
    return (0, common_1.applyDecorators)((0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard));
};
exports.Authenticated = Authenticated;
const Allow = (...roles) => {
    return (0, common_1.applyDecorators)((0, allow_decorator_1.Roles)(...roles), (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, permission_guard_1.PermissionGuard));
};
exports.Allow = Allow;
const AllowAny = (...roles) => {
    return (0, common_1.applyDecorators)((0, allow_decorator_1.Roles)(...roles), (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, permission_any_guard_1.PermissionAnyGuard));
};
exports.AllowAny = AllowAny;
//# sourceMappingURL=common.decorator.js.map