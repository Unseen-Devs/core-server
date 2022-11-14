import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { gqlOptions } from './graphql/gql-options';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { CommonModule } from './modules/common/common.module';
import { EventsModule } from './modules/events/events.module';
import { OptaModule } from './modules/opta/opta.module';
import { SendGridTransport } from './transport/nodemailer-sendgrid';
import { typeORMConfig } from './typeorm.config';
import { PlayerModule } from './modules/player/player.module';
import { RewardModule } from './modules/reward/reward.module';
import { UsersModule } from './modules/users/users.module';
import { PlayerNftModule } from './modules/player-nft/player-nft.module';
import { ClubModule } from './modules/club/club.module';
import { EventModule } from './modules/event/event.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './modules/tasks/task.module';

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
    ScheduleModule.forRoot(),
    CommonModule,
    OptaModule,
    UsersModule,
    PlayerModule,
    PlayerNftModule,
    RewardModule,
    ClubModule,
    EventModule,
    TasksModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //
    consumer.apply(LoggerMiddleware).forRoutes('/graphql');
  }
}
