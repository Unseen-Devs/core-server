import DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { RoleRepository } from '../repositories/role.repository';
import { User } from 'src/modules/users/entities/users.entity';
import { In } from 'typeorm';

@Injectable({
  scope: Scope.REQUEST,
})
export class UserByRoleDataLoader extends DataLoader<string, User[]> {
  constructor(private readonly roleRepository: RoleRepository) {
    super(async (ids: ReadonlyArray<string>) => {
      try {
        const rows = await this.roleRepository.find({
          relations: ['users'],
          where: {
            id: In([...ids]),
          },
        });
        return ids.map((id) => {
          const role = rows.find((x) => x.id == id);
          if (!role) return new Error('Role not found');
          return role.users;
        });
      } catch {
        return [];
      }
    });
  }
}
