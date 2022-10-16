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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const category_repository_1 = require("../repositories/category.repository");
const category_dataloader_1 = require("../dataloaders/category.dataloader");
let CategoryService = class CategoryService {
    constructor(categoryRepository, categoryDataloader) {
        this.categoryRepository = categoryRepository;
        this.categoryDataloader = categoryDataloader;
    }
    async findById(id) {
        return this.categoryDataloader.load(id);
    }
    async create(data) {
        const item = this.categoryRepository.create(data);
        return await this.categoryRepository.save(item);
    }
    async update(id, data) {
        await this.categoryRepository.update(id, data);
        return this.categoryRepository.findOne({ where: { id: data.id } });
    }
    async paginationCursor({ limit, page }) {
        return this.categoryRepository.paginate({
            limit,
            page,
        }, {
            order: {
                id: 'DESC',
            },
        });
    }
};
CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [category_repository_1.CategoryRepository,
        category_dataloader_1.CategoryDataLoader])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map