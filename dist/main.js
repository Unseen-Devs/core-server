"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
require("./dotenv-config");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const class_validator_1 = require("class-validator");
const app_module_1 = require("./app.module");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const HttpExceptionFilter_1 = require("./middlewares/HttpExceptionFilter");
const PORT = parseInt((_a = process.env.PORT) !== null && _a !== void 0 ? _a : '3000', 10);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: process.env.NODE_ENV === 'production' ? false : ['error', 'debug', 'warn'],
        cors: false,
        bodyParser: true,
    });
    app.use((0, cookie_parser_1.default)());
    app.useStaticAssets('uploads', {
        prefix: '/uploads',
        immutable: true,
        maxAge: 365 * 24 * 60 * 60 * 1000,
        etag: true,
        extensions: [
            'jpeg',
            'jpg',
            'png',
            'gif',
            'svg',
            'mp4',
            'pdf',
            'doc',
            'docx',
            'xlsx',
            'xls',
            'ppt',
            'pptx',
            'webp',
            'zip',
        ],
    });
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        disableErrorMessages: false,
    }));
    app.useGlobalFilters(new HttpExceptionFilter_1.HttpExceptionFilter());
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: false,
    }));
    app.use((0, helmet_1.default)({ contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false }));
    app.use((0, compression_1.default)());
    (0, class_validator_1.useContainer)(app.select(app_module_1.AppModule), { fallbackOnErrors: true });
    await app.listen(PORT);
    console.info(`Application is running on: ${await app.getUrl()}`);
}
bootstrap().finally(() => {
});
process.on('beforeExit', (code) => {
    console.log('Process beforeExit event with code: ', code);
});
process.on('exit', (code) => {
    console.log('Process exit event with code: ', code);
});
//# sourceMappingURL=main.js.map