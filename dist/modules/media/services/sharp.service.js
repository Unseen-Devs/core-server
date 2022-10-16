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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharpService = void 0;
const common_1 = require("@nestjs/common");
const sharp_1 = __importDefault(require("sharp"));
const constants_1 = require("../constants");
const helpers_1 = require("../helpers");
let SharpService = class SharpService {
    constructor(mediaOptions) {
        this.mediaOptions = mediaOptions;
    }
    resize(imgPath, fileName, option) {
        var _a, _b, _c, _d;
        if (this.mediaOptions.driver !== 'local') {
            return;
        }
        const thumbSize = (_b = (_a = option === null || option === void 0 ? void 0 : option.thumbSize) !== null && _a !== void 0 ? _a : this.mediaOptions.thumbSize) !== null && _b !== void 0 ? _b : 200;
        const quality = (_d = (_c = option === null || option === void 0 ? void 0 : option.quality) !== null && _c !== void 0 ? _c : this.mediaOptions.quality) !== null && _d !== void 0 ? _d : 70;
        const image = (0, sharp_1.default)(`${imgPath}/${fileName}`);
        return Promise.all([
            image
                .clone()
                .resize({
                width: thumbSize,
                height: thumbSize,
                fit: sharp_1.default.fit.cover,
                position: sharp_1.default.strategy.entropy,
            })
                .jpeg({
                quality: quality,
            })
                .png({
                quality: quality,
            })
                .toFile(`${imgPath}/${(0, helpers_1.thumbName)(fileName)}`),
        ]);
    }
};
SharpService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.MEDIA_OPTIONS)),
    __metadata("design:paramtypes", [Object])
], SharpService);
exports.SharpService = SharpService;
//# sourceMappingURL=sharp.service.js.map