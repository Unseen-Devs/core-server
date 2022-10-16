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
exports.BlogEntity = void 0;
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("../../../helpers/common");
let BlogEntity = class BlogEntity extends typeorm_1.BaseEntity {
    constructor(data) {
        super();
        Object.assign(this, Object.assign({ id: common_1.snowflake.nextId() }, data));
    }
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => String }, title: { type: () => String }, content: { type: () => String }, views: { type: () => Number }, isPublished: { type: () => Boolean }, createdAt: { type: () => Date }, updatedAt: { type: () => Date } };
    }
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, typeorm_1.Column)('bigint', {
        primary: true,
        unsigned: true,
    }),
    __metadata("design:type", String)
], BlogEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500, comment: 'Title of blog' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], BlogEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('text', {
        comment: 'Content of blog',
    }),
    __metadata("design:type", String)
], BlogEntity.prototype, "content", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.Column)('int', {
        default: 0,
        comment: 'Total view by client',
    }),
    __metadata("design:type", Number)
], BlogEntity.prototype, "views", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: true,
        comment: 'Set published',
    }),
    __metadata("design:type", Boolean)
], BlogEntity.prototype, "isPublished", void 0);
__decorate([
    (0, typeorm_2.CreateDateColumn)(),
    __metadata("design:type", Date)
], BlogEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_2.UpdateDateColumn)(),
    __metadata("design:type", Date)
], BlogEntity.prototype, "updatedAt", void 0);
BlogEntity = __decorate([
    (0, graphql_1.ObjectType)('Blog'),
    (0, typeorm_1.Entity)({
        name: 'blogs',
    }),
    __metadata("design:paramtypes", [Object])
], BlogEntity);
exports.BlogEntity = BlogEntity;
//# sourceMappingURL=blog.entity.js.map