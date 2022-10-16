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
exports.CategoryConnection = exports.CategoryEdge = void 0;
const eager_import_0 = require("./category.entity");
const eager_import_1 = require("./category_connection.entity");
const eager_import_2 = require("../../../graphql/types/common.interface.entity");
const graphql_1 = require("@nestjs/graphql");
let CategoryEdge = class CategoryEdge {
    static _GRAPHQL_METADATA_FACTORY() {
        return { node: { type: () => require("./category.entity").Category }, cursor: { type: () => String } };
    }
};
CategoryEdge = __decorate([
    (0, graphql_1.ObjectType)('CategoryEdge', {
        description: 'CategoryEdge',
    })
], CategoryEdge);
exports.CategoryEdge = CategoryEdge;
let CategoryConnection = class CategoryConnection {
    static _GRAPHQL_METADATA_FACTORY() {
        return { edges: { nullable: true, type: () => [require("./category_connection.entity").CategoryEdge] }, totalCount: { type: () => Number }, pageInfo: { type: () => require("../../../graphql/types/common.interface.entity").PageInfo } };
    }
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], CategoryConnection.prototype, "totalCount", void 0);
CategoryConnection = __decorate([
    (0, graphql_1.ObjectType)('CategoryConnection', {
        description: 'CategoryConnection',
    })
], CategoryConnection);
exports.CategoryConnection = CategoryConnection;
//# sourceMappingURL=category_connection.entity.js.map