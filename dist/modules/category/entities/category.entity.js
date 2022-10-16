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
exports.CategoryConnection = exports.Category = void 0;
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const common_interface_entity_1 = require("../../../graphql/types/common.interface.entity");
const common_1 = require("../../../helpers/common");
let Category = class Category extends typeorm_1.BaseEntity {
    constructor(data) {
        super();
        Object.assign(this, Object.assign({ id: common_1.snowflake.nextId() }, data));
    }
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => String }, title: { type: () => String }, isPublished: { type: () => Boolean }, ownerId: { type: () => String }, createdAt: { type: () => Date }, updatedAt: { type: () => Date } };
    }
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, typeorm_1.Column)('bigint', {
        primary: true,
        unsigned: true,
    }),
    __metadata("design:type", String)
], Category.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500 }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], Category.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: true,
    }),
    __metadata("design:type", Boolean)
], Category.prototype, "isPublished", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int4',
        nullable: false,
        unsigned: true,
    }),
    __metadata("design:type", String)
], Category.prototype, "ownerId", void 0);
__decorate([
    (0, typeorm_2.CreateDateColumn)(),
    __metadata("design:type", Date)
], Category.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_2.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Category.prototype, "updatedAt", void 0);
Category = __decorate([
    (0, graphql_1.ObjectType)('Category', {
        description: 'Category',
        implements: [common_interface_entity_1.Node],
    }),
    (0, typeorm_1.Entity)({
        name: 'categories',
    }),
    __metadata("design:paramtypes", [Object])
], Category);
exports.Category = Category;
let CategoryConnection = class CategoryConnection extends (0, common_interface_entity_1.PaginationBase)(Category) {
    static _GRAPHQL_METADATA_FACTORY() {
        return {};
    }
};
CategoryConnection = __decorate([
    (0, graphql_1.ObjectType)()
], CategoryConnection);
exports.CategoryConnection = CategoryConnection;
//# sourceMappingURL=category.entity.js.map