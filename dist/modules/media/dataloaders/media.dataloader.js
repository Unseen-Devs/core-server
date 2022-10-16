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
exports.MediaDataLoader = void 0;
const common_1 = require("@nestjs/common");
const dataloader_1 = __importDefault(require("dataloader"));
const media_repository_1 = require("../repositories/media.repository");
let MediaDataLoader = class MediaDataLoader extends dataloader_1.default {
    constructor(mediaRepository) {
        super(async (ids) => {
            const rows = await this.mediaRepository.findByIds([...ids]);
            return ids.map((id) => { var _a; return (_a = rows.find((x) => x.id == id)) !== null && _a !== void 0 ? _a : new Error('Not found'); });
        });
        this.mediaRepository = mediaRepository;
    }
};
MediaDataLoader = __decorate([
    (0, common_1.Injectable)({
        scope: common_1.Scope.DEFAULT,
    }),
    __metadata("design:paramtypes", [media_repository_1.MediaRepository])
], MediaDataLoader);
exports.MediaDataLoader = MediaDataLoader;
//# sourceMappingURL=media.dataloader.js.map