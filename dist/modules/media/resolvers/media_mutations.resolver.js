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
exports.MediaMutationsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_decorator_1 = require("../../../decorators/common.decorator");
const media_entity_1 = require("../entities/media.entity");
const media_service_1 = require("../services/media.service");
const graphql_2 = require("@nestjs/graphql");
const update_media_input_1 = require("../dto/update_media.input");
let MediaMutationsResolver = class MediaMutationsResolver {
    constructor(mediaService) {
        this.mediaService = mediaService;
    }
    async removeMedia(id) {
        return await this.mediaService.removeMedia(id);
    }
    async updateMedia(input) {
        return await this.mediaService.updateMedia(input);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => media_entity_1.MediaEntity),
    (0, common_decorator_1.Authenticated)(),
    __param(0, (0, graphql_1.Args)({ type: () => graphql_2.ID, name: 'id', nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MediaMutationsResolver.prototype, "removeMedia", null);
__decorate([
    (0, graphql_1.Mutation)(() => media_entity_1.MediaEntity),
    (0, common_decorator_1.Authenticated)(),
    __param(0, (0, graphql_1.Args)({ type: () => update_media_input_1.UpdateMediaInput, name: 'input', nullable: false })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_media_input_1.UpdateMediaInput]),
    __metadata("design:returntype", Promise)
], MediaMutationsResolver.prototype, "updateMedia", null);
MediaMutationsResolver = __decorate([
    (0, graphql_1.Resolver)(() => media_entity_1.MediaEntity),
    __metadata("design:paramtypes", [media_service_1.MediaService])
], MediaMutationsResolver);
exports.MediaMutationsResolver = MediaMutationsResolver;
//# sourceMappingURL=media_mutations.resolver.js.map