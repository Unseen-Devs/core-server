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
exports.MediaController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const media_service_1 = require("./services/media.service");
const rest_auth_guard_1 = require("../../guards/rest-auth.guard");
const common_decorator_1 = require("../../decorators/common.decorator");
const cqrs_1 = require("@nestjs/cqrs");
const image_resize_command_1 = require("./commands/image-resize.command");
const helpers_1 = require("./helpers");
const environtment_1 = require("../../helpers/environtment");
const constants_1 = require("./constants");
const apollo_server_errors_1 = require("apollo-server-errors");
let MediaController = class MediaController {
    constructor(mediaService, commandBus, options) {
        this.mediaService = mediaService;
        this.commandBus = commandBus;
        this.options = options;
    }
    async uploadFile(file, id) {
        var _a, _b;
        const data = {
            name: file.originalname,
            ownerId: id,
            mimeType: file.mimetype,
            fileSize: file.size,
        };
        if (this.options.driver === 'local') {
            this.commandBus.execute(new image_resize_command_1.ImageResizeCommand(file.destination, file.filename)).finally(() => {
            });
            data.filePath = file.path;
            data.originalUrl = file.path;
            data.thumbUrl = `${file.destination}/${(0, helpers_1.thumbName)(file.filename)}`;
        }
        else if (this.options.driver === 's3') {
            data.filePath = file.key;
            data.originalUrl = file.location;
            data.thumbUrl = file.location;
        }
        try {
            const media = await this.mediaService.addMedia(data);
            if (!((_a = media.originalUrl) === null || _a === void 0 ? void 0 : _a.startsWith('http')))
                media.originalUrl = `${environtment_1.BASE_URL}/${media.originalUrl}`;
            if (!((_b = media.thumbUrl) === null || _b === void 0 ? void 0 : _b.startsWith('http')))
                media.thumbUrl = `${environtment_1.BASE_URL}/${media.thumbUrl}`;
            return media;
        }
        catch (err) {
            throw new apollo_server_errors_1.ApolloError(err.message);
        }
    }
};
__decorate([
    (0, common_1.UseGuards)(rest_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        fileFilter: (_req, file, callback) => {
            if (!['image/png', 'image/jpeg', 'image/jpg', 'image/webp'].includes(file.mimetype)) {
                return callback(new Error('Only image files are allowed!'), false);
            }
            callback(null, true);
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_decorator_1.CurrentUserRest)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "uploadFile", null);
MediaController = __decorate([
    (0, common_1.Controller)('media'),
    __param(2, (0, common_1.Inject)(constants_1.MEDIA_OPTIONS)),
    __metadata("design:paramtypes", [media_service_1.MediaService,
        cqrs_1.CommandBus, Object])
], MediaController);
exports.MediaController = MediaController;
//# sourceMappingURL=media.controller.js.map