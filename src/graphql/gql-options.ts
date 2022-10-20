import { ApolloDriver } from '@nestjs/apollo';
import { GqlModuleOptions } from '@nestjs/graphql';
import { Request, Response } from 'express';

export const gqlOptions: GqlModuleOptions<ApolloDriver> = {
  fieldResolverEnhancers: ['guards', 'interceptors'],
  useGlobalPrefix: false,
  driver: ApolloDriver,
  // playground: true,
  // debug: !isProduction,
  // installSubscriptionHandlers: false,
  autoSchemaFile: 'schema.gql',
  // tracing: !isProduction,
  // plugins: [new ApolloComplexityPlugin(100)],
  // formatError: (error: GraphQLError) => {
  //   if (error.extensions?.exception?.response?.message === 'Unauthorized' || error.message === 'Unauthorized') {
  //     return new AuthenticationError('Unauthorized');
  //   }
  //   return error;
  // },
  context: ({ req, res, connection }: { req: Request; res: Response; connection: any }) => {
    if (connection) {
      // check connection for metadata
      return { req: connection.context as Request, res };
    } else {
      // check from req
      // return new GraphQLContext(req, res);
      return { req, res };
    }
  },
};
