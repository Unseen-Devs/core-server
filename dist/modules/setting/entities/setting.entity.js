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
exports.SettingConnection = exports.Setting = void 0;
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const common_interface_entity_1 = require("../../../graphql/types/common.interface.entity");
const common_1 = require("../../../helpers/common");
let Setting = class Setting extends typeorm_1.BaseEntity {
    constructor(data) {
        super();
        Object.assign(this, Object.assign({ id: common_1.snowflake.nextId() }, data));
    }
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => String }, name: { type: () => String }, value: { type: () => String }, createdAt: { type: () => Date }, updatedAt: { type: () => Date } };
    }
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, typeorm_1.Column)('bigint', {
        primary: true,
        unsigned: true,
    }),
    __metadata("design:type", String)
], Setting.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500, unique: true }),
    __metadata("design:type", String)
], Setting.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Setting.prototype, "value", void 0);
__decorate([
    (0, typeorm_2.CreateDateColumn)(),
    __metadata("design:type", Date)
], Setting.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_2.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Setting.prototype, "updatedAt", void 0);
Setting = __decorate([
    (0, graphql_1.ObjectType)('Setting', {
        description: 'Setting',
        implements: [common_interface_entity_1.Node],
    }),
    (0, typeorm_1.Entity)({
        name: 'settings',
    }),
    __metadata("design:paramtypes", [Object])
], Setting);
exports.Setting = Setting;
let SettingConnection = class SettingConnection extends (0, common_interface_entity_1.PaginationBase)(Setting) {
    static _GRAPHQL_METADATA_FACTORY() {
        return {};
    }
};
SettingConnection = __decorate([
    (0, graphql_1.ObjectType)()
], SettingConnection);
exports.SettingConnection = SettingConnection;
//# sourceMappingURL=setting.entity.js.map