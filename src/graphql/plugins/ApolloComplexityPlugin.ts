import {
  ApolloServerPlugin,
  GraphQLServiceContext,
  GraphQLRequestListener,
  GraphQLRequestContextDidResolveOperation,
  GraphQLServerListener,
  BaseContext,
} from 'apollo-server-plugin-base';
import { GraphQLError, GraphQLSchema, separateOperations } from 'graphql';
import { fieldExtensionsEstimator, getComplexity, simpleEstimator } from 'graphql-query-complexity';
import { Plugin } from '@nestjs/apollo';
import { GraphQLContext } from '../app.graphql-context';

@Plugin()
export class ApolloComplexityPlugin implements ApolloServerPlugin {
  private schema: GraphQLSchema;

  constructor(private readonly maxComplexity: number = 1000) {}

  async serverWillStart(service: GraphQLServiceContext): Promise<GraphQLServerListener | void> {
    this.schema = service.schema;
  }

  async requestDidStart(): Promise<GraphQLRequestListener | void> {
    const schema = this.schema;
    const maxComplexity = this.maxComplexity;
    return {
      async didResolveOperation({ request, document }) {
        /**
         * This provides GraphQL query analysis to be able to react on complex queries to your GraphQL server.
         * This can be used to protect your GraphQL servers against resource exhaustion and DoS attacks.
         * More documentation can be found at https://github.com/ivome/graphql-query-complexity.
         */
        const complexity = getComplexity({
          schema,
          operationName: request.operationName,
          // To calculate query complexity properly,
          // we have to check if the document contains multiple operations
          // and eventually extract it operation from the whole query document.
          query: request.operationName ? separateOperations(document)[`${request.operationName}`] : document,
          variables: request.variables,
          estimators: [
            // Using fieldConfigEstimator is mandatory to make it work with type-graphql.
            fieldExtensionsEstimator(),
            // Add more estimators here...
            // This will assign each field a complexity of 1
            // if no other estimator returned a value.
            simpleEstimator({ defaultComplexity: 1 }),
          ],
        });
        // Here we can react to the calculated complexity,
        // like compare it with max and throw error when the threshold is reached.
        if (complexity > maxComplexity) {
          throw new GraphQLError(`Query is too complex: ${complexity}. Maximum allowed complexity: ${maxComplexity}`);
        }
        // And here we can e.g. subtract the complexity point from hourly API calls limit.
        // Logger.info(`Used query complexity points: ${request.operationName}`, complexity);
        console.log('Query Complexity:', complexity);
      },
    };
  }
}
