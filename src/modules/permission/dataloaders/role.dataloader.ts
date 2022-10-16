import DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { Role } from '../entities/role.entity';
import { RoleRepository } from '../repositories/role.repository';

@Injectable({
  scope: Scope.REQUEST,
})
export class RoleDataLoader extends DataLoader<string, Role> {
  constructor(private readonly roleRepository: RoleRepository) {
    super(async (ids: ReadonlyArray<string>) => {
      const rows = await this.roleRepository.findByIds([...ids]);
      return ids.map((id) => rows.find((x) => x.id == id) || new Error('Role not found'));
    });
  }
}
