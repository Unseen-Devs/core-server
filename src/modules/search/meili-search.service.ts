import { Inject, Injectable, Optional } from '@nestjs/common';
import { MeiliSearch } from 'meilisearch';
import { SearchModuleOptions } from './interfaces/search-module-options.interface';
import { SEARCH_MODULE_OPTIONS } from './search.constants';

@Injectable()
export class MeiliSearchService extends MeiliSearch {
  constructor(
    @Optional()
    @Inject(SEARCH_MODULE_OPTIONS)
    option: SearchModuleOptions,
  ) {
    super(option);
  }
}
