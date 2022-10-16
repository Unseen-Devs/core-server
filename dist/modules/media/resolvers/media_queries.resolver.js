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
exports.MediaQueriesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const media_args_1 = require("../dto/media.args");
const media_entity_1 = require("../entities/media.entity");
const media_service_1 = require("../services/media.service");
const media_entity_2 = require("../entities/media.entity");
const common_decorator_1 = require("../../../decorators/common.decorator");
let MediaQueriesResolver = class MediaQueriesResolver {
    constructor(mediaService) {
        this.mediaService = mediaService;
    }
    async medias(args) {
        return this.mediaService.pagination(args);
    }
};
__decorate([
    (0, graphql_1.Query)(() => media_entity_2.MediaConnection, {
        nullable: true,
        name: 'medias',
        description: 'Require Authenticated',
    }),
    (0, common_decorator_1.Allow)(),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [media_args_1.MediaArgs]),
    __metadata("design:returntype", Promise)
], MediaQueriesResolver.prototype, "medias", null);
MediaQueriesResolver = __decorate([
    (0, graphql_1.Resolver)(() => media_entity_1.MediaEntity),
    __metadata("design:paramtypes", [media_service_1.MediaService])
], MediaQueriesResolver);
exports.MediaQueriesResolver = MediaQueriesResolver;
//# sourceMappingURL=media_queries.resolver.js.map