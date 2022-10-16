import { Injectable, CanActivate, ExecutionContext, Scope } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { onlyUniqueString } from 'src/helpers/common';
import { RoleByUserDataLoader } from 'src/modules/users/dataloaders/role-by-user.dataloader';
import { PERMISSIONS_METADATA_KEY } from './../decorators/allow.decorator';

@Injectable({
  scope: Scope.REQUEST,
})
export class PermissionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly roleByUserDataLoader: RoleByUserDataLoader) {
    //
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    if (!request?.user) return false;
    if (request.user.isSuperAdmin) {
      return true;
    }
    const roles = this.reflector.get<string[]>(PERMISSIONS_METADATA_KEY, ctx.getHandler());
    if (roles && roles?.length) {
      return this.roleByUserDataLoader.load(request.user.id).then((permissions) => {
        const roleList = permissions
          .reduce<string[]>((acc, curr) => {
            return acc.concat(curr.roles ?? []);
          }, [])
          .filter(onlyUniqueString);
        return !roles.some((role) => !roleList.includes(role));
      });
    }
    return true;
  }
}
