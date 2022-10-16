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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationArgs = void 0;
const eager_import_0 = require("./common.input");
const graphql_1 = require("@nestjs/graphql");
const graphql_type_json_1 = require("graphql-type-json");
let PaginationArgs = class PaginationArgs {
    static _GRAPHQL_METADATA_FACTORY() {
        return { limit: { nullable: true, type: () => Number }, page: { nullable: true, type: () => Number }, sort: { nullable: true, type: () => require("./common.input").SortInput }, filters: { nullable: true, type: () => [Object] }, s: { nullable: true, type: () => String } };
    }
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, {
        defaultValue: 15,
    }),
    __metadata("design:type", Number)
], PaginationArgs.prototype, "limit", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, {
        defaultValue: 1,
    }),
    __metadata("design:type", Number)
], PaginationArgs.prototype, "page", void 0);
__decorate([
    (0, graphql_1.Field)(() => [graphql_type_json_1.GraphQLJSONObject]),
    __metadata("design:type", Array)
], PaginationArgs.prototype, "filters", void 0);
PaginationArgs = __decorate([
    (0, graphql_1.ArgsType)()
], PaginationArgs);
exports.PaginationArgs = PaginationArgs;
//# sourceMappingURL=common.args.js.map