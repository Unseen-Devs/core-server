import DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { UserRepository } from '../repositories/users.repository';
import { In } from 'typeorm';
import { onlyUniqueString } from 'src/helpers/common';

@Injectable({
  scope: Scope.REQUEST,
})
export class PermissionByUserDataLoader extends DataLoader<string, string[]> {
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
          const roles = row.permissions.reduce<string[]>((acc, curr) => {
            return acc.concat(curr.roles ?? []);
          }, []);
          return roles.filter(onlyUniqueString);
        });
      } catch (err) {
        //
        return ids.map((id) => new Error(`User ${id} not found`));
      }
    });
  }
}
