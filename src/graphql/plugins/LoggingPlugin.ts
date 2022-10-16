import { Logger } from '@nestjs/common';
import { Plugin } from '@nestjs/apollo';
import { ApolloServerPlugin, GraphQLRequestListener } from 'apollo-server-plugin-base';

@Plugin()
export class LoggingPlugin implements ApolloServerPlugin {
  re;
  async requestDidStart(): Promise<GraphQLRequestListener | void> {
    Logger.log('Request started');
    return {
      async willSendResponse() {
        Logger.log('Will send response');
      },
    };
  }
}
