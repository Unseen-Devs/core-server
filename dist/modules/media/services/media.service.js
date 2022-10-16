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
exports.MediaService = void 0;
const common_1 = require("@nestjs/common");
const media_repository_1 = require("../repositories/media.repository");
let MediaService = class MediaService {
    constructor(mediaRepository) {
        this.mediaRepository = mediaRepository;
        this.removeMedia = async (id) => {
            const media = await this.mediaRepository.findOneOrFail({
                where: {
                    id,
                    isDeleted: false,
                },
            });
            media.isDeleted = true;
            return this.mediaRepository.save(media);
        };
        this.updateMedia = async (data) => {
            await this.mediaRepository.update(data.id, { name: data.name });
            return this.mediaRepository.findOneOrFail({ where: { id: data.id } });
        };
    }
    addMedia(data) {
        const media = this.mediaRepository.create(data);
        return this.mediaRepository.save(media);
    }
    async pagination({ page, limit, filters }) {
        return this.mediaRepository.paginate({
            page,
            limit,
            filters,
        }, {
            order: {
                createdAt: 'DESC',
            },
        });
    }
};
MediaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [media_repository_1.MediaRepository])
], MediaService);
exports.MediaService = MediaService;
//# sourceMappingURL=media.service.js.map