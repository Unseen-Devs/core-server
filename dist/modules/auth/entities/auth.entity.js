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
exports.AuthTokenEntity = void 0;
const eager_import_0 = require("../../users/entities/users.entity");
const typeorm_1 = require("typeorm");
const users_entity_1 = require("../../users/entities/users.entity");
let AuthTokenEntity = class AuthTokenEntity extends typeorm_1.BaseEntity {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => String }, userId: { type: () => String }, deviceId: { nullable: true, type: () => String }, accessToken: { type: () => String }, refreshToken: { type: () => String }, createdAt: { type: () => Date }, updatedAt: { type: () => Date }, users: { type: () => require("../../users/entities/users.entity").User } };
    }
};
__decorate([
    (0, typeorm_1.Column)('bigint', {
        primary: true,
        unsigned: true,
    }),
    __metadata("design:type", String)
], AuthTokenEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('bigint', { name: 'user_id' }),
    __metadata("design:type", String)
], AuthTokenEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'device_id', nullable: true }),
    __metadata("design:type", String)
], AuthTokenEntity.prototype, "deviceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'access_token' }),
    __metadata("design:type", String)
], AuthTokenEntity.prototype, "accessToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'refresh_token' }),
    __metadata("design:type", String)
], AuthTokenEntity.prototype, "refreshToken", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], AuthTokenEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', nullable: true }),
    __metadata("design:type", Date)
], AuthTokenEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.User, (users) => users.id, { createForeignKeyConstraints: true }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", Promise)
], AuthTokenEntity.prototype, "users", void 0);
AuthTokenEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: 'auth_tokens',
    })
], AuthTokenEntity);
exports.AuthTokenEntity = AuthTokenEntity;
//# sourceMappingURL=auth.entity.js.map