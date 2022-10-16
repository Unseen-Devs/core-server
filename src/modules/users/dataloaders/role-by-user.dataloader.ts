import DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { UserRepository } from '../repositories/users.repository';
import { In } from 'typeorm';
import { Role } from 'src/modules/permission/entities/role.entity';

@Injectable({
  scope: Scope.REQUEST,
})
export class RoleByUserDataLoader extends DataLoader<string, Role[]> {
  constructor(private readonly userRepository: UserRepository) {
    super(async (ids: ReadonlyArray<string>) => {
      try {
        const rows = await this.userRepository.find({
          relations: ['permissions'],
          where: {
            id: In([...ids]),
          },
        });
        return ids.map((id) => {
          const row = rows.find((x) => x.id == id);
          if (!row) return new Error('Role not found');
          return row.permissions;
        });
      } catch (err) {
        //
        return ids.map((id) => new Error(`User ${id} not found`));
      }
    });
  }
}
