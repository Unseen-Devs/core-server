import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../repositories/category.repository';
import { Category } from '../entities/category.entity';
import { CategoryDataLoader } from '../dataloaders/category.dataloader';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly categoryDataloader: CategoryDataLoader,
  ) {}

  async findById(id: string) {
    return this.categoryDataloader.load(id);
  }
  async create(data: Partial<Category>) {
    const item = this.categoryRepository.create(data);
    return await this.categoryRepository.save(item);
  }

  async update(id: string, data: Partial<Category>) {
    await this.categoryRepository.update(id, data);
    return this.categoryRepository.findOne({ where: { id: data.id } });
  }

  async paginationCursor({ limit, page }: { limit?: number; page?: number }) {
    return this.categoryRepository.paginate(
      {
        limit,
        page,
      },
      {
        order: {
          id: 'DESC',
        },
      },
    );
  }
}
