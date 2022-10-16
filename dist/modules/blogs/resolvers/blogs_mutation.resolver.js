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
exports.BlogsMutationResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const blogs_service_1 = require("../services/blogs.service");
const new_blog_input_1 = require("../dto/new_blog.input");
const blog_entity_1 = require("../entities/blog.entity");
let BlogsMutationResolver = class BlogsMutationResolver {
    constructor(blogService) {
        this.blogService = blogService;
    }
    async createBlog(input) {
        const blog = await this.blogService.create(input);
        return blog;
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => blog_entity_1.BlogEntity),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [new_blog_input_1.NewBlogInput]),
    __metadata("design:returntype", Promise)
], BlogsMutationResolver.prototype, "createBlog", null);
BlogsMutationResolver = __decorate([
    (0, graphql_1.Resolver)(() => blog_entity_1.BlogEntity),
    __metadata("design:paramtypes", [blogs_service_1.BlogsService])
], BlogsMutationResolver);
exports.BlogsMutationResolver = BlogsMutationResolver;
//# sourceMappingURL=blogs_mutation.resolver.js.map