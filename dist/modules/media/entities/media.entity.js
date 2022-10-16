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
exports.MediaConnection = exports.MediaEntity = void 0;
const eager_import_0 = require("../../../graphql/enums/file_type");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const common_interface_entity_1 = require("../../../graphql/types/common.interface.entity");
const file_type_1 = require("../../../graphql/enums/file_type");
const common_1 = require("../../../helpers/common");
let MediaEntity = class MediaEntity extends typeorm_1.BaseEntity {
    constructor(data) {
        super();
        Object.assign(this, Object.assign({ id: common_1.snowflake.nextId() }, data));
    }
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => String }, name: { type: () => String }, filePath: { nullable: true, type: () => String }, originalUrl: { nullable: true, type: () => String }, thumbUrl: { nullable: true, type: () => String }, mimeType: { nullable: true, type: () => String }, fileSize: { nullable: true, type: () => Number }, isDeleted: { type: () => Boolean }, ownerId: { nullable: true, type: () => String }, type: { type: () => require("../../../graphql/enums/file_type").FileTypeEnum }, createdAt: { type: () => Date }, updatedAt: { type: () => Date } };
    }
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, typeorm_1.Column)('bigint', {
        primary: true,
        unsigned: true,
    }),
    __metadata("design:type", String)
], MediaEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500 }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], MediaEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500, nullable: true }),
    __metadata("design:type", String)
], MediaEntity.prototype, "filePath", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500, nullable: true }),
    __metadata("design:type", String)
], MediaEntity.prototype, "originalUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500, nullable: true }),
    __metadata("design:type", String)
], MediaEntity.prototype, "thumbUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], MediaEntity.prototype, "mimeType", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.Column)({ type: 'int4', unsigned: true, nullable: true }),
    __metadata("design:type", Number)
], MediaEntity.prototype, "fileSize", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: false,
    }),
    __metadata("design:type", Boolean)
], MediaEntity.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint',
        nullable: true,
        unsigned: true,
    }),
    __metadata("design:type", String)
], MediaEntity.prototype, "ownerId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        default: file_type_1.FileTypeEnum.FILE,
        enum: file_type_1.FileTypeEnum,
    }),
    __metadata("design:type", String)
], MediaEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_2.CreateDateColumn)(),
    __metadata("design:type", Date)
], MediaEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_2.UpdateDateColumn)(),
    __metadata("design:type", Date)
], MediaEntity.prototype, "updatedAt", void 0);
MediaEntity = __decorate([
    (0, graphql_1.ObjectType)('Media', {
        implements: [common_interface_entity_1.Node],
    }),
    (0, typeorm_1.Entity)({
        name: 'medias',
    }),
    __metadata("design:paramtypes", [Object])
], MediaEntity);
exports.MediaEntity = MediaEntity;
let MediaConnection = class MediaConnection extends (0, common_interface_entity_1.PaginationBase)(MediaEntity) {
    static _GRAPHQL_METADATA_FACTORY() {
        return {};
    }
};
MediaConnection = __decorate([
    (0, graphql_1.ObjectType)('MediaConnection')
], MediaConnection);
exports.MediaConnection = MediaConnection;
//# sourceMappingURL=media.entity.js.map