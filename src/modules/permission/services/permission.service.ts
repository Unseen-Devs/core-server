import { Injectable, NotFoundException } from '@nestjs/common';
import { DeepPartial, In } from 'typeorm';
import { RoleRepository } from '../repositories/role.repository';
import { Role } from '../entities/role.entity';
import { UsersService } from 'src/modules/users/services/users.service';
import { PaginationArgs } from 'src/graphql/types/common.args';

@Injectable()
export class PermissionService {
  constructor(private readonly roleRepository: RoleRepository, private readonly userService: UsersService) {}

  findByIds(ids: string[]) {
    return this.roleRepository.findByIds(ids);
  }
  create = (data: DeepPartial<Role>) => {
    const role = this.roleRepository.create(data);
    return this.roleRepository.save(role);
  };

  async remove(id: string) {
    await this.roleRepository.delete(id);
    return true;
  }

  update = async (id: string, data: DeepPartial<Role>) => {
    await this.roleRepository.update(id, data);
    return this.findOne(id);
  };

  findOne = async (id: string) => {
    return this.roleRepository.findOneOrFail({ where: { id } });
  };

  async pagination(args: PaginationArgs) {
    return this.roleRepository.paginate(args);
  }

  async addUsersToRole(roleId: string, userIds: string[]) {
    try {
      const role = await this.roleRepository.findOne({
        where: { id: roleId },
        relations: ['users'],
      });
      if (!role) throw new NotFoundException('Role not found');
      const users = await this.userService.find({
        where: {
          id: In(userIds),
          isSuperAdmin: false,
        },
      });
      role.users.push(...users);
      return role.save();
    } catch (err) {
      //
      throw err;
    }
    //
  }

  async removeUsersToRole(roleId: string, userIds: string[]) {
    try {
      const role = await this.roleRepository.findOne({
        relations: ['users'],
        where: {
          id: roleId,
        },
      });
      if (role?.users) {
        role.users = role?.users.filter((v) => !userIds.includes(v.id));
        return this.roleRepository.save(role);
      }
      return role;
    } catch (err) {
      //
      throw err;
    }
    //
  }
}
