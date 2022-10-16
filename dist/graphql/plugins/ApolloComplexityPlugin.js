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
exports.ApolloComplexityPlugin = void 0;
const graphql_1 = require("graphql");
const graphql_query_complexity_1 = require("graphql-query-complexity");
const apollo_1 = require("@nestjs/apollo");
let ApolloComplexityPlugin = class ApolloComplexityPlugin {
    constructor(maxComplexity = 1000) {
        this.maxComplexity = maxComplexity;
    }
    async serverWillStart(service) {
        this.schema = service.schema;
    }
    async requestDidStart() {
        const schema = this.schema;
        const maxComplexity = this.maxComplexity;
        return {
            async didResolveOperation({ request, document }) {
                const complexity = (0, graphql_query_complexity_1.getComplexity)({
                    schema,
                    operationName: request.operationName,
                    query: request.operationName ? (0, graphql_1.separateOperations)(document)[`${request.operationName}`] : document,
                    variables: request.variables,
                    estimators: [
                        (0, graphql_query_complexity_1.fieldExtensionsEstimator)(),
                        (0, graphql_query_complexity_1.simpleEstimator)({ defaultComplexity: 1 }),
                    ],
                });
                if (complexity > maxComplexity) {
                    throw new graphql_1.GraphQLError(`Query is too complex: ${complexity}. Maximum allowed complexity: ${maxComplexity}`);
                }
                console.log('Query Complexity:', complexity);
            },
        };
    }
};
ApolloComplexityPlugin = __decorate([
    (0, apollo_1.Plugin)(),
    __metadata("design:paramtypes", [Number])
], ApolloComplexityPlugin);
exports.ApolloComplexityPlugin = ApolloComplexityPlugin;
//# sourceMappingURL=ApolloComplexityPlugin.js.map