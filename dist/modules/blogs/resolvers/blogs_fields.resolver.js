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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogsFieldsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const blog_entity_1 = require("../entities/blog.entity");
const category_entity_1 = require("../../category/entities/category.entity");
let BlogsFieldsResolver = class BlogsFieldsResolver {
    title(blog) {
        return blog.title;
    }
    categories(blog) {
        return [];
    }
};
__decorate([
    (0, graphql_1.ResolveField)(),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [blog_entity_1.BlogEntity]),
    __metadata("design:returntype", void 0)
], BlogsFieldsResolver.prototype, "title", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [category_entity_1.Category]),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [blog_entity_1.BlogEntity]),
    __metadata("design:returntype", void 0)
], BlogsFieldsResolver.prototype, "categories", null);
BlogsFieldsResolver = __decorate([
    (0, graphql_1.Resolver)(() => blog_entity_1.BlogEntity)
], BlogsFieldsResolver);
exports.BlogsFieldsResolver = BlogsFieldsResolver;
//# sourceMappingURL=blogs_fields.resolver.js.map