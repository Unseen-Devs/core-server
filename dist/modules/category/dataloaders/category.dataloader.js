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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryDataLoader = void 0;
const dataloader_1 = __importDefault(require("dataloader"));
const common_1 = require("@nestjs/common");
const category_repository_1 = require("../repositories/category.repository");
let CategoryDataLoader = class CategoryDataLoader extends dataloader_1.default {
    constructor(categoryRepository) {
        super(async (ids) => {
            const rows = await this.categoryRepository.findByIds([...ids]);
            return ids.map((id) => { var _a; return (_a = rows.find((x) => x.id == id)) !== null && _a !== void 0 ? _a : new Error('Not found'); });
        });
        this.categoryRepository = categoryRepository;
    }
};
CategoryDataLoader = __decorate([
    (0, common_1.Injectable)({
        scope: common_1.Scope.REQUEST,
    }),
    __metadata("design:paramtypes", [category_repository_1.CategoryRepository])
], CategoryDataLoader);
exports.CategoryDataLoader = CategoryDataLoader;
//# sourceMappingURL=category.dataloader.js.map