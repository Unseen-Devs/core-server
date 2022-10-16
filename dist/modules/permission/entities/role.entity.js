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
exports.RoleConnection = exports.Role = void 0;
const eager_import_0 = require("../../users/entities/users.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const common_interface_entity_1 = require("../../../graphql/types/common.interface.entity");
const common_1 = require("../../../helpers/common");
const users_entity_1 = require("../../users/entities/users.entity");
let Role = class Role extends typeorm_1.BaseEntity {
    constructor(data) {
        super();
        Object.assign(this, Object.assign({ id: common_1.snowflake.nextId() }, data));
    }
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => String }, name: { type: () => String }, roles: { nullable: true, type: () => [String] }, createdAt: { type: () => Date }, updatedAt: { type: () => Date }, users: { type: () => [require("../../users/entities/users.entity").User] } };
    }
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, typeorm_1.Column)('bigint', {
        primary: true,
        unsigned: true,
    }),
    __metadata("design:type", String)
], Role.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500, unique: true }),
    __metadata("design:type", String)
], Role.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], Role.prototype, "roles", void 0);
__decorate([
    (0, typeorm_2.CreateDateColumn)(),
    __metadata("design:type", Date)
], Role.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_2.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Role.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => users_entity_1.User, (user) => user.permissions, {
        cascade: true,
    }),
    (0, typeorm_1.JoinTable)({
        name: 'users_roles',
        joinColumn: {
            name: 'roleId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'userId',
            referencedColumnName: 'id',
        },
    }),
    __metadata("design:type", Array)
], Role.prototype, "users", void 0);
Role = __decorate([
    (0, graphql_1.ObjectType)('Role', {
        description: 'Role',
        implements: [common_interface_entity_1.Node],
    }),
    (0, typeorm_1.Entity)({
        name: 'roles',
    }),
    __metadata("design:paramtypes", [Object])
], Role);
exports.Role = Role;
let RoleConnection = class RoleConnection extends (0, common_interface_entity_1.PaginationBase)(Role) {
    static _GRAPHQL_METADATA_FACTORY() {
        return {};
    }
};
RoleConnection = __decorate([
    (0, graphql_1.ObjectType)()
], RoleConnection);
exports.RoleConnection = RoleConnection;
//# sourceMappingURL=role.entity.js.map