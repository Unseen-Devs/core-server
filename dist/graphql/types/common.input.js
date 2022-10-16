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
exports.SortInput = exports.FilterInput = void 0;
const eager_import_0 = require("../enums/filter_operator_type");
const graphql_1 = require("@nestjs/graphql");
const filter_operator_type_1 = require("../enums/filter_operator_type");
let FilterInput = class FilterInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { field: { type: () => String }, operator: { type: () => require("../enums/filter_operator_type").FilterOperatorTypeEnum }, type: { type: () => require("../enums/filter_operator_type").FilterFieldTypeEnum }, value: { type: () => String } };
    }
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], FilterInput.prototype, "field", void 0);
__decorate([
    (0, graphql_1.Field)(() => filter_operator_type_1.FilterOperatorTypeEnum),
    __metadata("design:type", String)
], FilterInput.prototype, "operator", void 0);
__decorate([
    (0, graphql_1.Field)(() => filter_operator_type_1.FilterFieldTypeEnum, {
        defaultValue: filter_operator_type_1.FilterFieldTypeEnum.STRING,
    }),
    __metadata("design:type", String)
], FilterInput.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], FilterInput.prototype, "value", void 0);
FilterInput = __decorate([
    (0, graphql_1.InputType)()
], FilterInput);
exports.FilterInput = FilterInput;
let SortInput = class SortInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { field: { type: () => String }, direction: { nullable: true, type: () => String } };
    }
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], SortInput.prototype, "field", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], SortInput.prototype, "direction", void 0);
SortInput = __decorate([
    (0, graphql_1.InputType)()
], SortInput);
exports.SortInput = SortInput;
//# sourceMappingURL=common.input.js.map