import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { gqlOptions } from './graphql/gql-options';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { CommonModule } from './modules/common/common.module';
import { OptaModule } from './modules/opta/opta.module';
import { SendGridTransport } from './transport/nodemailer-sendgrid';
import { typeORMConfig } from './typeorm.config';

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
    CommonModule,
    OptaModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //
    consumer.apply(LoggerMiddleware).forRoutes('/graphql');
  }
}
