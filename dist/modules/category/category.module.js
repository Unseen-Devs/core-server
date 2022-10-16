"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModule = void 0;
const common_1 = require("@nestjs/common");
const category_entity_1 = require("./entities/category.entity");
const category_repository_1 = require("./repositories/category.repository");
const typeorm_1 = require("@nestjs/typeorm");
const category_dataloader_1 = require("./dataloaders/category.dataloader");
const category_resolver_1 = require("./resolvers/category.resolver");
const category_service_1 = require("./services/category.service");
let CategoryModule = class CategoryModule {
};
CategoryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([category_entity_1.Category, category_repository_1.CategoryRepository])],
        providers: [category_dataloader_1.CategoryDataLoader, category_resolver_1.CategoryResolver, category_service_1.CategoryService],
        exports: [category_dataloader_1.CategoryDataLoader],
    })
], CategoryModule);
exports.CategoryModule = CategoryModule;
//# sourceMappingURL=category.module.js.map