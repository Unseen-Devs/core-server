"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElasticProvider = exports.createElasticClient = exports.ELASTICSEARCH_CLIENT = void 0;
const common_1 = require("@nestjs/common");
const elasticsearch_1 = require("@elastic/elasticsearch");
const elastic_constants_1 = require("./elastic.constants");
exports.ELASTICSEARCH_CLIENT = 'ELASTICSEARCH_CLIENT';
const createElasticClient = () => ({
    provide: exports.ELASTICSEARCH_CLIENT,
    useFactory: (options) => {
        return new elasticsearch_1.Client(options);
    },
    inject: [elastic_constants_1.ELASTICSEARCH_MODULE_OPTIONS],
});
exports.createElasticClient = createElasticClient;
let ElasticProvider = class ElasticProvider {
};
ElasticProvider = __decorate([
    (0, common_1.Injectable)()
], ElasticProvider);
exports.ElasticProvider = ElasticProvider;
//# sourceMappingURL=elastic.provider.js.map