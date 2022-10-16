"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("@nestjs/typeorm");
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const typeorm_config_1 = require("./typeorm.config");
const gql_options_1 = require("./graphql/gql-options");
const auth_module_1 = require("./modules/auth/auth.module");
const auth_constants_1 = require("./modules/auth/auth.constants");
const users_module_1 = require("./modules/users/users.module");
const blogs_module_1 = require("./modules/blogs/blogs.module");
const common_module_1 = require("./modules/common/common.module");
const media_module_1 = require("./modules/media/media.module");
const category_module_1 = require("./modules/category/category.module");
const permission_module_1 = require("./modules/permission/permission.module");
const logger_middleware_1 = require("./middlewares/logger.middleware");
const setting_module_1 = require("./modules/setting/setting.module");
const nodemailer_sendgrid_1 = require("./transport/nodemailer-sendgrid");
const search_module_1 = require("./modules/search/search.module");
const social_auth_module_1 = require("./modules/social-auth/social-auth.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes('/graphql');
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(typeorm_config_1.typeORMConfig),
            graphql_1.GraphQLModule.forRoot(gql_options_1.gqlOptions),
            mailer_1.MailerModule.forRoot({
                transport: new nodemailer_sendgrid_1.SendGridTransport({
                    apiKey: process.env.SENDGRID_API_KEY,
                }),
                defaults: {
                    from: process.env.EMAIL_SERVER_SENDER_FROM,
                },
                preview: false,
                template: {
                    dir: `${process.cwd()}/assets/email-templates/`,
                    adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
            media_module_1.MediaModule.register({
                driver: 'local',
                uploadDir: 'uploads',
                quality: 70,
                thumbSize: 200,
            }),
            auth_module_1.AuthModule.register({
                secret: auth_constants_1.APP_SECRET,
            }),
            users_module_1.UsersModule.register({
                codeExpireTime: 30,
            }),
            blogs_module_1.BlogsModule,
            common_module_1.CommonModule,
            category_module_1.CategoryModule,
            permission_module_1.PermissionModule,
            search_module_1.SearchModule,
            setting_module_1.SettingModule,
            social_auth_module_1.SocialAuthModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map