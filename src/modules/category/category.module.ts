import { Module } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { CategoryRepository } from './repositories/category.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryDataLoader } from './dataloaders/category.dataloader';
import { CategoryResolver } from './resolvers/category.resolver';
import { CategoryService } from './services/category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category, CategoryRepository])],
  providers: [CategoryDataLoader, CategoryResolver, CategoryService],
  exports: [CategoryDataLoader],
})
export class CategoryModule {}
