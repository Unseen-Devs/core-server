import { Resolver, Query } from '@nestjs/graphql';
import { Permission } from '../entities/permission.entity';
import { permissions } from 'src/helpers/permissions';

@Resolver(() => Permission)
export class PermissionQueryResolver {
  @Query(() => [Permission])
  async permissions() {
    return permissions;
  }
}
