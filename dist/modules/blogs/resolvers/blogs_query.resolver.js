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
exports.BlogsQueryResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const blogs_service_1 = require("../services/blogs.service");
const blog_connection_entity_1 = require("../entities/blog_connection.entity");
const graphql_2 = require("@nestjs/graphql");
const blog_dataloader_1 = require("../dataloaders/blog.dataloader");
const blog_entity_1 = require("../entities/blog.entity");
let BlogsQueryResolver = class BlogsQueryResolver {
    constructor(blogService, blogDataLoader) {
        this.blogService = blogService;
        this.blogDataLoader = blogDataLoader;
    }
    async blog(id) {
        return await this.blogDataLoader.load(id);
    }
    async blogs(limit) {
        return this.blogService.pagination({ limit: limit, orderDirection: 'DESC' });
    }
};
__decorate([
    (0, graphql_1.Query)(() => blog_entity_1.BlogEntity, {
        nullable: true,
        description: 'BLog Detail',
    }),
    __param(0, (0, graphql_1.Args)({ name: 'id', type: () => graphql_2.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogsQueryResolver.prototype, "blog", null);
__decorate([
    (0, graphql_1.Query)(() => blog_connection_entity_1.BlogConnection, { nullable: true }),
    __param(0, (0, graphql_1.Args)({ name: 'limit', type: () => graphql_2.Int, defaultValue: 15 })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BlogsQueryResolver.prototype, "blogs", null);
BlogsQueryResolver = __decorate([
    (0, graphql_1.Resolver)(() => blog_entity_1.BlogEntity),
    __metadata("design:paramtypes", [blogs_service_1.BlogsService, blog_dataloader_1.BlogDataLoader])
], BlogsQueryResolver);
exports.BlogsQueryResolver = BlogsQueryResolver;
//# sourceMappingURL=blogs_query.resolver.js.map