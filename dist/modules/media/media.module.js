"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var MediaModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const fs_1 = require("fs");
const constants_1 = require("./constants");
const media_entity_1 = require("./entities/media.entity");
const media_dataloader_1 = require("./dataloaders/media.dataloader");
const media_repository_1 = require("./repositories/media.repository");
const media_mutations_resolver_1 = require("./resolvers/media_mutations.resolver");
const media_queries_resolver_1 = require("./resolvers/media_queries.resolver");
const media_service_1 = require("./services/media.service");
const media_field_resolver_1 = require("./resolvers/media_field.resolver");
const media_controller_1 = require("./media.controller");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const cqrs_1 = require("@nestjs/cqrs");
const image_resize_handler_1 = require("./handlers/image-resize.handler");
const sharp_service_1 = require("./services/sharp.service");
const path_1 = require("path");
const nanoid_1 = require("nanoid");
const fs_2 = __importDefault(require("fs"));
const deburr_1 = __importDefault(require("lodash/deburr"));
const kebabCase_1 = __importDefault(require("lodash/kebabCase"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const client_s3_1 = require("@aws-sdk/client-s3");
let MediaModule = MediaModule_1 = class MediaModule {
    static register(options) {
        let storage;
        const id = (0, nanoid_1.nanoid)();
        if ((options === null || options === void 0 ? void 0 : options.driver) === 's3') {
            const s3 = new client_s3_1.S3Client({});
            storage = (0, multer_s3_1.default)({
                s3: s3,
                bucket: options.bucketName,
                acl: 'public-read',
                cacheControl: 'max-age=31536000',
                key: function (req, file, cb) {
                    const fileExtName = (0, path_1.extname)(file.originalname);
                    const fileName = (0, path_1.basename)(file.originalname, fileExtName);
                    cb(null, `${id}_${(0, kebabCase_1.default)((0, deburr_1.default)(fileName))}${fileExtName}`);
                },
            });
        }
        else {
            if (!(options === null || options === void 0 ? void 0 : options.uploadDir)) {
                common_1.Logger.error('Upload dir must be config');
            }
            else {
                if (!(0, fs_1.existsSync)(options.uploadDir))
                    (0, fs_1.mkdirSync)(options.uploadDir, { recursive: true, mode: '0777' });
            }
            storage = (0, multer_1.diskStorage)({
                destination: (_req, file, callback) => {
                    const imageDir = `${options.uploadDir}/${id}`;
                    if (!fs_2.default.existsSync(imageDir)) {
                        fs_2.default.mkdirSync(imageDir);
                    }
                    callback(null, imageDir);
                },
                filename: (_req, file, callback) => {
                    const fileExtName = (0, path_1.extname)(file.originalname);
                    const fileName = (0, path_1.basename)(file.originalname, fileExtName);
                    callback(null, `${(0, kebabCase_1.default)((0, deburr_1.default)(fileName))}${fileExtName}`);
                },
            });
        }
        return {
            module: MediaModule_1,
            imports: [
                platform_express_1.MulterModule.register({
                    storage,
                }),
            ],
            providers: [
                {
                    provide: constants_1.MEDIA_OPTIONS,
                    useValue: options,
                },
                sharp_service_1.SharpService,
            ],
        };
    }
    onModuleInit() {
    }
};
MediaModule = MediaModule_1 = __decorate([
    (0, common_1.Module)({
        controllers: [media_controller_1.MediaController],
        imports: [cqrs_1.CqrsModule, typeorm_1.TypeOrmModule.forFeature([media_entity_1.MediaEntity, media_repository_1.MediaRepository])],
        providers: [
            media_mutations_resolver_1.MediaMutationsResolver,
            media_service_1.MediaService,
            media_dataloader_1.MediaDataLoader,
            media_field_resolver_1.MediaFieldResolver,
            media_queries_resolver_1.MediaQueriesResolver,
            image_resize_handler_1.ImageResizeHandler,
        ],
        exports: [media_service_1.MediaService, media_dataloader_1.MediaDataLoader],
    })
], MediaModule);
exports.MediaModule = MediaModule;
//# sourceMappingURL=media.module.js.map