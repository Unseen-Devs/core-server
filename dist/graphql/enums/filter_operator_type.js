"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterFieldTypeEnum = exports.FilterOperatorTypeEnum = void 0;
const graphql_1 = require("@nestjs/graphql");
var FilterOperatorTypeEnum;
(function (FilterOperatorTypeEnum) {
    FilterOperatorTypeEnum["EQ"] = "EQ";
    FilterOperatorTypeEnum["NE"] = "NE";
    FilterOperatorTypeEnum["LESSTHAN"] = "LESSTHAN";
    FilterOperatorTypeEnum["LESSTHAN_EQ"] = "LESSTHAN_EQ";
    FilterOperatorTypeEnum["GREATERTHAN"] = "GREATERTHAN";
    FilterOperatorTypeEnum["GREATERTHAN_EQ"] = "GREATERTHAN_EQ";
    FilterOperatorTypeEnum["CONTAINS"] = "CONTAINS";
    FilterOperatorTypeEnum["BETWEEN"] = "BETWEEN";
    FilterOperatorTypeEnum["BETWEEN_EQ"] = "BETWEEN_EQ";
})(FilterOperatorTypeEnum = exports.FilterOperatorTypeEnum || (exports.FilterOperatorTypeEnum = {}));
var FilterFieldTypeEnum;
(function (FilterFieldTypeEnum) {
    FilterFieldTypeEnum["DATE"] = "DATE";
    FilterFieldTypeEnum["NUMBER"] = "NUMBER";
    FilterFieldTypeEnum["BOOLEAN"] = "BOOLEAN";
    FilterFieldTypeEnum["STRING"] = "STRING";
})(FilterFieldTypeEnum = exports.FilterFieldTypeEnum || (exports.FilterFieldTypeEnum = {}));
(0, graphql_1.registerEnumType)(FilterOperatorTypeEnum, {
    name: 'FilterOperatorTypeEnum',
});
(0, graphql_1.registerEnumType)(FilterFieldTypeEnum, {
    name: 'FilterFieldTypeEnum',
});
//# sourceMappingURL=filter_operator_type.js.map