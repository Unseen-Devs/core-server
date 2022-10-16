import { createParamDecorator, applyDecorators, UseGuards, ExecutionContext } from '@nestjs/common';
import { GraphQLResolveInfo } from 'graphql';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';
import { Request, Response } from 'express';
import { User } from 'src/modules/users/entities/users.entity';
import { Roles } from './allow.decorator';
import { PermissionGuard } from 'src/guards/permission.guard';
import { PermissionType } from 'src/helpers/permissions';
import { PermissionAnyGuard } from 'src/guards/permission-any.guard';
type GraphqlContext = {
  req: Request;
  res: Response;
};

type GraphQLExecutionContext = [any, any, GraphqlContext, GraphQLResolveInfo];

export const AcceptLang = createParamDecorator<unknown, ExecutionContext, string | Promise<string>>((_data, host) => {
  const [, , ctx] = host.getArgs<GraphQLExecutionContext>();
  return ctx?.req?.acceptsLanguages(['en', 'vi']) || 'en';
});

export const GraphQLInfo = createParamDecorator<any, ExecutionContext, GraphQLResolveInfo>((_data, host) => {
  const [, , , info] = host.getArgs<GraphQLExecutionContext>();
  return info;
});

export const CurrentUser = createParamDecorator<keyof User, ExecutionContext, any>((field, host) => {
  const [, , ctx] = host.getArgs<GraphQLExecutionContext>();
  const user = ctx?.req?.user as any;
  if (user && field) return user[field];
  return user;
});

export const CurrentUserRest = createParamDecorator<keyof User, ExecutionContext, any>((field, ctx) => {
  const request = ctx.switchToHttp().getRequest<Request>();
  const user = request.user as any;
  if (user && field) return user[field];
  return user;
});

export const Authenticated = () => {
  return applyDecorators(UseGuards(GqlAuthGuard));
};

export const Allow = (...roles: PermissionType[]) => {
  return applyDecorators(Roles(...roles), UseGuards(GqlAuthGuard, PermissionGuard));
};

export const AllowAny = (...roles: PermissionType[]) => {
  return applyDecorators(Roles(...roles), UseGuards(GqlAuthGuard, PermissionAnyGuard));
};
