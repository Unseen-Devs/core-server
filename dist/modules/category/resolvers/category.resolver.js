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
exports.CategoryResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const category_service_1 = require("../services/category.service");
const new_category_input_1 = require("../dto/new_category.input");
const category_entity_1 = require("../entities/category.entity");
const category_args_1 = require("../dto/category.args");
const common_decorator_1 = require("../../../decorators/common.decorator");
const users_entity_1 = require("../../users/entities/users.entity");
const users_dataloader_1 = require("../../users/dataloaders/users.dataloader");
const category_entity_2 = require("../entities/category.entity");
let CategoryResolver = class CategoryResolver {
    constructor(categoryService, userDataLoader) {
        this.categoryService = categoryService;
        this.userDataLoader = userDataLoader;
    }
    async categories(args) {
        return await this.categoryService.paginationCursor(args);
    }
    owner(category) {
        return this.userDataLoader.load(category.ownerId);
    }
    createCategory(input, currentUser) {
        return this.categoryService.create(Object.assign(Object.assign({}, input), { ownerId: currentUser.id }));
    }
    async updateCategory(input, currentUser) {
        const category = await this.categoryService.findById(input.id);
        if (category.ownerId !== currentUser.id)
            throw new common_1.ForbiddenException();
        return this.categoryService.update(input.id, input);
    }
};
__decorate([
    (0, graphql_1.Query)(() => category_entity_1.CategoryConnection, {
        nullable: true,
    }),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_args_1.CategoryListArgs]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "categories", null);
__decorate([
    (0, graphql_1.ResolveField)(() => users_entity_1.User, {
        nullable: true,
    }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_entity_2.Category]),
    __metadata("design:returntype", void 0)
], CategoryResolver.prototype, "owner", null);
__decorate([
    (0, graphql_1.Mutation)(() => category_entity_2.Category),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, common_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [new_category_input_1.NewCategoryInput, users_entity_1.User]),
    __metadata("design:returntype", void 0)
], CategoryResolver.prototype, "createCategory", null);
__decorate([
    (0, graphql_1.Mutation)(() => category_entity_2.Category),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, common_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [new_category_input_1.UpdateCategoryInput, users_entity_1.User]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "updateCategory", null);
CategoryResolver = __decorate([
    (0, graphql_1.Resolver)(() => category_entity_2.Category),
    __metadata("design:paramtypes", [category_service_1.CategoryService, users_dataloader_1.UserDataLoader])
], CategoryResolver);
exports.CategoryResolver = CategoryResolver;
//# sourceMappingURL=category.resolver.js.map