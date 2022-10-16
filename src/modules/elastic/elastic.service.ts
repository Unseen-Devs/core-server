import { Injectable, Inject } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';
import { ELASTICSEARCH_CLIENT } from './elastic.provider';
import {
  BulkRequest,
  ClearScrollRequest,
  CountRequest,
  CreateRequest,
  DeleteByQueryRequest,
  DeleteRequest,
  DeleteScriptRequest,
  ExistsRequest,
  FieldCapsRequest,
  GetRequest,
  GetResponse,
  GetSourceRequest,
  IndexRequest,
  IndexResponse,
  InfoRequest,
  PingRequest,
  ScrollRequest,
  ScrollResponse,
  SearchRequest,
  SearchResponse,
  UpdateByQueryRequest,
  UpdateRequest,
} from '@elastic/elasticsearch/lib/api/types';

@Injectable()
export class ElasticService {
  constructor(@Inject(ELASTICSEARCH_CLIENT) private readonly esClient: Client) {}

  getClient(): Client {
    return this.esClient;
  }

  getSource(params: GetSourceRequest) {
    return this.esClient.getSource(params);
  }

  clearScroll(params: ClearScrollRequest) {
    return this.esClient.clearScroll(params);
  }

  ping(params: PingRequest) {
    return this.esClient.ping(params);
  }

  search<T extends any>(params: SearchRequest): Promise<SearchResponse<T>> {
    return this.esClient.search(params);
  }

  scroll<T extends any>(params: ScrollRequest): Promise<ScrollResponse<T>> {
    return this.esClient.scroll(params);
  }

  count(params: CountRequest) {
    return this.esClient.count(params);
  }

  create(params: CreateRequest) {
    return this.esClient.create(params);
  }

  update(params: UpdateRequest) {
    return this.esClient.update(params);
  }

  updateByQuery(params: UpdateByQueryRequest) {
    return this.esClient.updateByQuery(params);
  }

  delete(params: DeleteRequest) {
    return this.esClient.delete(params);
  }

  deleteByQuery(params: DeleteByQueryRequest) {
    return this.esClient.deleteByQuery(params);
  }

  deleteScript(params: DeleteScriptRequest) {
    return this.esClient.deleteScript(params);
  }

  exists(params: ExistsRequest) {
    return this.esClient.exists(params);
  }

  bulk(params: BulkRequest) {
    return this.esClient.bulk(params);
  }

  fieldCaps(params: FieldCapsRequest) {
    return this.esClient.fieldCaps(params);
  }

  get<T extends any>(params: GetRequest): Promise<GetResponse<T>> {
    return this.esClient.get(params);
  }

  index<T = Record<string, any>>(params: IndexRequest<T>): Promise<IndexResponse> {
    return this.esClient.index(params);
  }

  info(params: InfoRequest) {
    return this.esClient.info(params);
  }

  close() {
    return this.esClient.close();
  }
}
