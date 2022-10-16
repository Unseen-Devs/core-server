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
exports.PaginationCursor = exports.PaginationBase = exports.CursorConnection = exports.Connection = exports.PageInfo = exports.Edge = exports.Node = void 0;
const eager_import_0 = require("./common.interface.entity");
const graphql_1 = require("@nestjs/graphql");
let Node = class Node {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => String } };
    }
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], Node.prototype, "id", void 0);
Node = __decorate([
    (0, graphql_1.InterfaceType)({
        description: 'Node',
    })
], Node);
exports.Node = Node;
let Edge = class Edge {
    static _GRAPHQL_METADATA_FACTORY() {
        return { cursor: { nullable: true, type: () => String } };
    }
};
Edge = __decorate([
    (0, graphql_1.InterfaceType)()
], Edge);
exports.Edge = Edge;
let PageInfo = class PageInfo {
    static _GRAPHQL_METADATA_FACTORY() {
        return { startCursor: { nullable: true, type: () => String }, endCursor: { nullable: true, type: () => String }, hasPrevPage: { type: () => Boolean }, hasNextPage: { type: () => Boolean } };
    }
};
PageInfo = __decorate([
    (0, graphql_1.ObjectType)()
], PageInfo);
exports.PageInfo = PageInfo;
let Connection = class Connection {
    static _GRAPHQL_METADATA_FACTORY() {
        return { itemCount: { type: () => Number }, totalItems: { type: () => Number }, pageCount: { type: () => Number }, next: { nullable: true, type: () => String }, previous: { nullable: true, type: () => String } };
    }
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Connection.prototype, "itemCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Connection.prototype, "totalItems", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Connection.prototype, "pageCount", void 0);
Connection = __decorate([
    (0, graphql_1.InterfaceType)()
], Connection);
exports.Connection = Connection;
let CursorConnection = class CursorConnection {
    static _GRAPHQL_METADATA_FACTORY() {
        return { totalCount: { type: () => Number }, pageInfo: { type: () => require("./common.interface.entity").PageInfo } };
    }
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], CursorConnection.prototype, "totalCount", void 0);
CursorConnection = __decorate([
    (0, graphql_1.InterfaceType)()
], CursorConnection);
exports.CursorConnection = CursorConnection;
let BasePaginationMeta = class BasePaginationMeta {
    static _GRAPHQL_METADATA_FACTORY() {
        return { itemCount: { type: () => Number }, totalItems: { type: () => Number }, itemsPerPage: { type: () => Number }, totalPages: { type: () => Number }, currentPage: { type: () => Number } };
    }
};
BasePaginationMeta = __decorate([
    (0, graphql_1.ObjectType)()
], BasePaginationMeta);
function PaginationBase(classRef) {
    let PaginatedType = class PaginatedType {
        static _GRAPHQL_METADATA_FACTORY() {
            return { items: { type: () => [Object] }, meta: { type: () => BasePaginationMeta } };
        }
    };
    __decorate([
        (0, graphql_1.Field)(() => [classRef], { nullable: true }),
        __metadata("design:type", Array)
    ], PaginatedType.prototype, "items", void 0);
    PaginatedType = __decorate([
        (0, graphql_1.ObjectType)({ isAbstract: true })
    ], PaginatedType);
    return PaginatedType;
}
exports.PaginationBase = PaginationBase;
function PaginationCursor(classRef) {
    let EdgeType = class EdgeType {
        static _GRAPHQL_METADATA_FACTORY() {
            return { cursor: { type: () => String }, node: { type: () => Object } };
        }
    };
    __decorate([
        (0, graphql_1.Field)(() => String),
        __metadata("design:type", String)
    ], EdgeType.prototype, "cursor", void 0);
    __decorate([
        (0, graphql_1.Field)(() => classRef),
        __metadata("design:type", Object)
    ], EdgeType.prototype, "node", void 0);
    EdgeType = __decorate([
        (0, graphql_1.ObjectType)(`${classRef.name}Edge`)
    ], EdgeType);
    let PaginatedType = class PaginatedType {
        static _GRAPHQL_METADATA_FACTORY() {
            return { edges: { type: () => [EdgeType] }, nodes: { type: () => [Object] }, totalCount: { type: () => Number }, pageInfo: { type: () => require("./common.interface.entity").PageInfo } };
        }
    };
    __decorate([
        (0, graphql_1.Field)(() => [EdgeType], { nullable: true }),
        __metadata("design:type", Array)
    ], PaginatedType.prototype, "edges", void 0);
    __decorate([
        (0, graphql_1.Field)(() => [classRef], { nullable: true }),
        __metadata("design:type", Array)
    ], PaginatedType.prototype, "nodes", void 0);
    __decorate([
        (0, graphql_1.Field)(() => graphql_1.Int),
        __metadata("design:type", Number)
    ], PaginatedType.prototype, "totalCount", void 0);
    PaginatedType = __decorate([
        (0, graphql_1.ObjectType)({ isAbstract: true })
    ], PaginatedType);
    return PaginatedType;
}
exports.PaginationCursor = PaginationCursor;
//# sourceMappingURL=common.interface.entity.js.map