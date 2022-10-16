import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { typeORMConfig } from './typeorm.config';
import { gqlOptions } from './graphql/gql-options';
import { AuthModule } from './modules/auth/auth.module';
import { APP_SECRET } from './modules/auth/auth.constants';
import { UsersModule } from './modules/users/users.module';
import { BlogsModule } from './modules/blogs/blogs.module';
import { CommonModule } from './modules/common/common.module';
import { MediaModule } from './modules/media/media.module';
import { CategoryModule } from './modules/category/category.module';
import { PermissionModule } from './modules/permission/permission.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { SettingModule } from './modules/setting/setting.module';
import { SendGridTransport } from './transport/nodemailer-sendgrid';
import { SearchModule } from './modules/search/search.module';
import { SocialAuthModule } from './modules/social-auth/social-auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    GraphQLModule.forRoot(gqlOptions),
    MailerModule.forRoot({
      transport: new SendGridTransport({
        apiKey: process.env.SENDGRID_API_KEY,
      }),
      defaults: {
        from: process.env.EMAIL_SERVER_SENDER_FROM,
      },
      preview: false,
      template: {
        dir: `${process.cwd()}/assets/email-templates/`,
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    MediaModule.register({
      driver: 'local',
      uploadDir: 'uploads',
      quality: 70,
      thumbSize: 200,
    }),
    AuthModule.register({
      secret: APP_SECRET,
    }),
    UsersModule.register({
      codeExpireTime: 30,
    }),
    BlogsModule,
    CommonModule,
    CategoryModule,
    PermissionModule,
    SearchModule,
    SettingModule,
    SocialAuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //
    consumer.apply(LoggerMiddleware).forRoutes('/graphql');
  }
}
