"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const blog_entity_1 = require("./entities/blog.entity");
const blogs_service_1 = require("./services/blogs.service");
const blog_repository_1 = require("./repositories/blog.repository");
const UniqueTitle_1 = require("./validators/UniqueTitle");
const blog_dataloader_1 = require("./dataloaders/blog.dataloader");
const category_module_1 = require("../category/category.module");
const blogs_query_resolver_1 = require("./resolvers/blogs_query.resolver");
const blogs_mutation_resolver_1 = require("./resolvers/blogs_mutation.resolver");
const blogs_fields_resolver_1 = require("./resolvers/blogs_fields.resolver");
let BlogsModule = class BlogsModule {
};
BlogsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([blog_entity_1.BlogEntity, blog_repository_1.BlogRepository]),
            category_module_1.CategoryModule,
        ],
        providers: [
            UniqueTitle_1.UniqueTitle,
            blogs_query_resolver_1.BlogsQueryResolver,
            blogs_mutation_resolver_1.BlogsMutationResolver,
            blogs_fields_resolver_1.BlogsFieldsResolver,
            blog_dataloader_1.BlogDataLoader,
            blogs_service_1.BlogsService,
        ],
        exports: [
            blog_dataloader_1.BlogDataLoader,
            blogs_service_1.BlogsService,
        ],
    })
], BlogsModule);
exports.BlogsModule = BlogsModule;
//# sourceMappingURL=blogs.module.js.map