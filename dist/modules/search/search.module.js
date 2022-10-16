"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SearchModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchModule = void 0;
const common_1 = require("@nestjs/common");
const search_resolver_1 = require("./search.resolver");
const cqrs_1 = require("@nestjs/cqrs");
const search_constants_1 = require("./search.constants");
const meili_search_service_1 = require("./meili-search.service");
let SearchModule = SearchModule_1 = class SearchModule {
    static register(options) {
        return {
            module: SearchModule_1,
            providers: [{ provide: search_constants_1.SEARCH_MODULE_OPTIONS, useValue: options }, meili_search_service_1.MeiliSearchService],
            exports: [meili_search_service_1.MeiliSearchService],
        };
    }
};
SearchModule = SearchModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [cqrs_1.CqrsModule],
        providers: [search_resolver_1.SearchResolver],
    })
], SearchModule);
exports.SearchModule = SearchModule;
//# sourceMappingURL=search.module.js.map