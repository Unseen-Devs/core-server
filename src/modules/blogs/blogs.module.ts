import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogEntity } from './entities/blog.entity';
import { BlogsService } from './services/blogs.service';
import { BlogRepository } from './repositories/blog.repository';
import { UniqueTitle } from './validators/UniqueTitle';
import { BlogDataLoader } from './dataloaders/blog.dataloader';
import { CategoryModule } from '../category/category.module';
import { BlogsQueryResolver } from './resolvers/blogs_query.resolver';
import { BlogsMutationResolver } from './resolvers/blogs_mutation.resolver';
import { BlogsFieldsResolver } from './resolvers/blogs_fields.resolver';
// import { PromModule, MetricType } from '@digikare/nestjs-prom';

// import { SonicModule } from '../sonic/sonic.module';
// import { AudioService } from './services/audio.service';
// import { AudioProcessor } from './processors/audio.processor';
// import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    // PromModule.forMetrics([
    //   {
    //     type: MetricType.Counter,
    //     configuration: {
    //       name: 'my_counter',
    //       help: 'my_counter a simple counter',
    //     },
    //   },
    //   {
    //     type: MetricType.Gauge,
    //     configuration: {
    //       name: 'my_gauge',
    //       help: 'my_gauge a simple gauge',
    //     },
    //   },
    //   {
    //     type: MetricType.Histogram,
    //     configuration: {
    //       name: 'my_histogram',
    //       help: 'my_histogram a simple histogram',
    //     },
    //   },
    //   {
    //     type: MetricType.Summary,
    //     configuration: {
    //       name: 'my_summary',
    //       help: 'my_summary a simple summary',
    //     },
    //   },
    // ]),
    TypeOrmModule.forFeature([BlogEntity, BlogRepository]),
    CategoryModule,
    // BullModule.registerQueue({
    //     name: 'audio',
    // }),
  ],
  providers: [
    UniqueTitle,

    // Resolver
    BlogsQueryResolver,
    BlogsMutationResolver,
    BlogsFieldsResolver,

    // DataLoader
    BlogDataLoader,

    // Service
    BlogsService,
    // AudioService,

    // Processor
    // AudioProcessor,
  ],
  exports: [
    BlogDataLoader,
    BlogsService,
    // AudioService
  ],
})
export class BlogsModule {}
