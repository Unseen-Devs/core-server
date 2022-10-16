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
exports.UserConnection = exports.User = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const common_interface_entity_1 = require("../../../graphql/types/common.interface.entity");
const common_1 = require("../../../helpers/common");
const role_entity_1 = require("../../permission/entities/role.entity");
let User = class User extends typeorm_1.BaseEntity {
    constructor(partial) {
        super();
        Object.assign(this, Object.assign({ id: common_1.snowflake.nextId() }, partial));
    }
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => String }, email: { type: () => String }, firstName: { type: () => String }, lastName: { nullable: true, type: () => String }, avatar: { nullable: true, type: () => String }, age: { nullable: true, type: () => Number }, isActive: { type: () => Boolean }, isSuperAdmin: { type: () => Boolean }, createdAt: { type: () => Date }, updatedAt: { type: () => Date } };
    }
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, typeorm_1.Column)('bigint', {
        primary: true,
        unsigned: true,
    }),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, unique: true }),
    (0, typeorm_1.Index)({
        unique: true,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, graphql_1.HideField)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, graphql_1.HideField)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "passwordSalt", void 0);
__decorate([
    (0, graphql_1.Field)({
        nullable: true,
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    (0, typeorm_1.Index)({ fulltext: true }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, typeorm_1.Index)({ fulltext: true }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.Column)('int', { nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: false,
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: false,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isSuperAdmin", void 0);
__decorate([
    (0, graphql_1.HideField)(),
    (0, typeorm_1.RelationId)((user) => user.permissions),
    __metadata("design:type", Array)
], User.prototype, "permissionIds", void 0);
__decorate([
    (0, graphql_1.HideField)(),
    (0, typeorm_1.ManyToMany)(() => role_entity_1.Role, (role) => role.users),
    __metadata("design:type", Array)
], User.prototype, "permissions", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
User = __decorate([
    (0, graphql_1.ObjectType)({
        implements: [common_interface_entity_1.Node],
    }),
    (0, typeorm_1.Entity)({
        name: 'users',
    }),
    __metadata("design:paramtypes", [Object])
], User);
exports.User = User;
let UserConnection = class UserConnection extends (0, common_interface_entity_1.PaginationBase)(User) {
    static _GRAPHQL_METADATA_FACTORY() {
        return {};
    }
};
UserConnection = __decorate([
    (0, graphql_1.ObjectType)()
], UserConnection);
exports.UserConnection = UserConnection;
//# sourceMappingURL=users.entity.js.map