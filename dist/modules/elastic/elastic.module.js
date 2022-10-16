"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ElasticModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElasticModule = void 0;
const common_1 = require("@nestjs/common");
const elastic_service_1 = require("./elastic.service");
const elastic_provider_1 = require("./elastic.provider");
const elastic_constants_1 = require("./elastic.constants");
let ElasticModule = ElasticModule_1 = class ElasticModule {
    static register(options) {
        return {
            module: ElasticModule_1,
            providers: [(0, elastic_provider_1.createElasticClient)(), { provide: elastic_constants_1.ELASTICSEARCH_MODULE_OPTIONS, useValue: options }],
        };
    }
    static registerAsync(options) {
        return {
            module: ElasticModule_1,
            imports: options.imports || [],
            providers: [(0, elastic_provider_1.createElasticClient)(), ...this.createAsyncProviders(options)],
        };
    }
    static createAsyncProviders(options) {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options)];
        }
        if (options.useClass)
            return [
                this.createAsyncOptionsProvider(options),
                {
                    provide: options.useClass,
                    useClass: options.useClass,
                },
            ];
        return [];
    }
    static createAsyncOptionsProvider(options) {
        if (options.useFactory) {
            return {
                provide: elastic_constants_1.ELASTICSEARCH_MODULE_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        if (options.useExisting)
            return {
                provide: elastic_constants_1.ELASTICSEARCH_MODULE_OPTIONS,
                useFactory: async (optionsFactory) => optionsFactory.createElasticOptions(),
                inject: [options.useExisting],
            };
        if (options.useClass)
            return {
                provide: elastic_constants_1.ELASTICSEARCH_MODULE_OPTIONS,
                useFactory: async (optionsFactory) => optionsFactory.createElasticOptions(),
                inject: [options.useClass],
            };
        return {
            provide: elastic_constants_1.ELASTICSEARCH_MODULE_OPTIONS,
            useValue: undefined,
        };
    }
};
ElasticModule = ElasticModule_1 = __decorate([
    (0, common_1.Module)({
        providers: [elastic_service_1.ElasticService],
        exports: [elastic_service_1.ElasticService],
    })
], ElasticModule);
exports.ElasticModule = ElasticModule;
//# sourceMappingURL=elastic.module.js.map