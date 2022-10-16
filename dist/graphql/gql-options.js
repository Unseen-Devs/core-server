"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gqlOptions = void 0;
const apollo_1 = require("@nestjs/apollo");
exports.gqlOptions = {
    fieldResolverEnhancers: ['guards', 'interceptors'],
    useGlobalPrefix: false,
    driver: apollo_1.ApolloDriver,
    autoSchemaFile: true,
    context: ({ req, res, connection }) => {
        if (connection) {
            return { req: connection.context, res };
        }
        else {
            return { req, res };
        }
    },
};
//# sourceMappingURL=gql-options.js.map