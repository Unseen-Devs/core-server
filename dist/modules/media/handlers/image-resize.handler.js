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
exports.ImageResizeHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const image_resize_command_1 = require("../commands/image-resize.command");
const sharp_service_1 = require("../services/sharp.service");
let ImageResizeHandler = class ImageResizeHandler {
    constructor(sharpService) {
        this.sharpService = sharpService;
    }
    async execute(command) {
        const { imgPath, fileName } = command;
        return this.sharpService.resize(imgPath, fileName);
    }
};
ImageResizeHandler = __decorate([
    (0, cqrs_1.CommandHandler)(image_resize_command_1.ImageResizeCommand),
    __metadata("design:paramtypes", [sharp_service_1.SharpService])
], ImageResizeHandler);
exports.ImageResizeHandler = ImageResizeHandler;
//# sourceMappingURL=image-resize.handler.js.map