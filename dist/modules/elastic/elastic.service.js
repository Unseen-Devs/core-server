"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElasticService = void 0;
const common_1 = require("@nestjs/common");
const elasticsearch_1 = require("@elastic/elasticsearch");
const elastic_provider_1 = require("./elastic.provider");
let ElasticService = class ElasticService {
    constructor(esClient) {
        this.esClient = esClient;
    }
    getClient() {
        return this.esClient;
    }
    getSource(params) {
        return this.esClient.getSource(params);
    }
    clearScroll(params) {
        return this.esClient.clearScroll(params);
    }
    ping(params) {
        return this.esClient.ping(params);
    }
    search(params) {
        return this.esClient.search(params);
    }
    scroll(params) {
        return this.esClient.scroll(params);
    }
    count(params) {
        return this.esClient.count(params);
    }
    create(params) {
        return this.esClient.create(params);
    }
    update(params) {
        return this.esClient.update(params);
    }
    updateByQuery(params) {
        return this.esClient.updateByQuery(params);
    }
    delete(params) {
        return this.esClient.delete(params);
    }
    deleteByQuery(params) {
        return this.esClient.deleteByQuery(params);
    }
    deleteScript(params) {
        return this.esClient.deleteScript(params);
    }
    exists(params) {
        return this.esClient.exists(params);
    }
    bulk(params) {
        return this.esClient.bulk(params);
    }
    fieldCaps(params) {
        return this.esClient.fieldCaps(params);
    }
    get(params) {
        return this.esClient.get(params);
    }
    index(params) {
        return this.esClient.index(params);
    }
    info(params) {
        return this.esClient.info(params);
    }
    close() {
        return this.esClient.close();
    }
};
ElasticService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(elastic_provider_1.ELASTICSEARCH_CLIENT)),
    __metadata("design:paramtypes", [elasticsearch_1.Client])
], ElasticService);
exports.ElasticService = ElasticService;
//# sourceMappingURL=elastic.service.js.map