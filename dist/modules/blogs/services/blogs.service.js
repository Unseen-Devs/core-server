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
exports.BlogsService = void 0;
const common_1 = require("@nestjs/common");
const blog_repository_1 = require("../repositories/blog.repository");
const blog_entity_1 = require("../entities/blog.entity");
let BlogsService = class BlogsService {
    constructor(blogRepository) {
        this.blogRepository = blogRepository;
        this.findOneOrFail = (data) => this.blogRepository.findOneOrFail(data);
        this.create = (data) => {
            const blog = new blog_entity_1.BlogEntity(data);
            return this.blogRepository.save(blog);
        };
    }
    pagination(data) {
        return this.blogRepository.paginate({ limit: data.limit, page: 1 });
    }
};
BlogsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [blog_repository_1.BlogRepository])
], BlogsService);
exports.BlogsService = BlogsService;
//# sourceMappingURL=blogs.service.js.map