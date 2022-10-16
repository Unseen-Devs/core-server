"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogConnection = void 0;
const graphql_1 = require("@nestjs/graphql");
const blog_entity_1 = require("./blog.entity");
const common_interface_entity_1 = require("../../../graphql/types/common.interface.entity");
let BlogConnection = class BlogConnection extends (0, common_interface_entity_1.PaginationBase)(blog_entity_1.BlogEntity) {
    static _GRAPHQL_METADATA_FACTORY() {
        return {};
    }
};
BlogConnection = __decorate([
    (0, graphql_1.ObjectType)({
        description: 'Blog list',
    })
], BlogConnection);
exports.BlogConnection = BlogConnection;
//# sourceMappingURL=blog_connection.entity.js.map