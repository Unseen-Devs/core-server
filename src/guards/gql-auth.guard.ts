import { ExecutionContext, Injectable, Scope } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable({
  scope: Scope.REQUEST,
})
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext();
    return ctx.req;
  }
}
