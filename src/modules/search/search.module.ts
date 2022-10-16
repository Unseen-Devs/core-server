import { DynamicModule, Global, Module } from '@nestjs/common';
import { SearchResolver } from './search.resolver';
import { CqrsModule } from '@nestjs/cqrs';
import { SearchModuleOptions } from './interfaces/search-module-options.interface';
import { SEARCH_MODULE_OPTIONS } from './search.constants';
import { MeiliSearchService } from './meili-search.service';

@Global()
@Module({
  imports: [CqrsModule],
  providers: [SearchResolver],
})
export class SearchModule {
  static register(options: SearchModuleOptions): DynamicModule {
    return {
      module: SearchModule,
      providers: [{ provide: SEARCH_MODULE_OPTIONS, useValue: options }, MeiliSearchService],
      exports: [MeiliSearchService],
    };
  }
}
