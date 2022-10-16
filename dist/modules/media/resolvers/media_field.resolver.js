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
exports.MediaFieldResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const users_dataloader_1 = require("../../users/dataloaders/users.dataloader");
const users_entity_1 = require("../../users/entities/users.entity");
const media_entity_1 = require("../entities/media.entity");
let MediaFieldResolver = class MediaFieldResolver {
    constructor(userDataLoader) {
        this.userDataLoader = userDataLoader;
    }
    filePath(media) {
        var _a, _b, _c;
        if (media.type === 'dir')
            return '';
        return ((_a = media.filePath) === null || _a === void 0 ? void 0 : _a.startsWith('http'))
            ? media.filePath
            : `${(_b = process.env.BASE_URL) !== null && _b !== void 0 ? _b : ''}/${(_c = media.filePath) !== null && _c !== void 0 ? _c : ''}`;
    }
    thumbUrl(media) {
        var _a, _b, _c;
        if (media.type === 'dir')
            return '';
        return ((_a = media.thumbUrl) === null || _a === void 0 ? void 0 : _a.startsWith('http'))
            ? media.thumbUrl
            : `${(_b = process.env.BASE_URL) !== null && _b !== void 0 ? _b : ''}/${(_c = media.thumbUrl) !== null && _c !== void 0 ? _c : ''}`;
    }
    originalUrl(media) {
        var _a, _b, _c;
        if (media.type === 'dir')
            return '';
        return ((_a = media.originalUrl) === null || _a === void 0 ? void 0 : _a.startsWith('http'))
            ? media.originalUrl
            : `${(_b = process.env.BASE_URL) !== null && _b !== void 0 ? _b : ''}/${(_c = media.originalUrl) !== null && _c !== void 0 ? _c : ''}`;
    }
    owner(media) {
        if (media.ownerId)
            return this.userDataLoader.load(media.ownerId);
        return null;
    }
};
__decorate([
    (0, graphql_1.ResolveField)(() => String, {
        nullable: true,
    }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [media_entity_1.MediaEntity]),
    __metadata("design:returntype", void 0)
], MediaFieldResolver.prototype, "filePath", null);
__decorate([
    (0, graphql_1.ResolveField)(() => String, {
        nullable: true,
    }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [media_entity_1.MediaEntity]),
    __metadata("design:returntype", void 0)
], MediaFieldResolver.prototype, "thumbUrl", null);
__decorate([
    (0, graphql_1.ResolveField)(() => String, {
        nullable: true,
    }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [media_entity_1.MediaEntity]),
    __metadata("design:returntype", void 0)
], MediaFieldResolver.prototype, "originalUrl", null);
__decorate([
    (0, graphql_1.ResolveField)(() => users_entity_1.User, {
        nullable: true,
    }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [media_entity_1.MediaEntity]),
    __metadata("design:returntype", void 0)
], MediaFieldResolver.prototype, "owner", null);
MediaFieldResolver = __decorate([
    (0, graphql_1.Resolver)(() => media_entity_1.MediaEntity),
    __metadata("design:paramtypes", [users_dataloader_1.UserDataLoader])
], MediaFieldResolver);
exports.MediaFieldResolver = MediaFieldResolver;
//# sourceMappingURL=media_field.resolver.js.map