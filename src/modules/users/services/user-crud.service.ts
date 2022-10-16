import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/users.repository';
import bcrypt from 'bcryptjs';
import { NewUserInput, UpdateUserInput } from '../dto/new_user.input';
import { PermissionService } from 'src/modules/permission/services/permission.service';
import { DeepPartial } from 'typeorm';
import { User } from '../entities/users.entity';

@Injectable()
export class UserCRUDService {
  constructor(private readonly userRepository: UserRepository, private readonly permissionService: PermissionService) {}

  async create(data: NewUserInput) {
    const salt = bcrypt.genSaltSync(10);
    data.password = bcrypt.hashSync(data.password, salt);
    const user = this.userRepository.create({ ...data, passwordSalt: salt });
    if (data.roles) {
      const permissions = await this.permissionService.findByIds(data.roles);
      user.permissions = permissions;
    }
    return this.userRepository.save(user);
  }

  async update(id: string, { roles, password, ...data }: UpdateUserInput) {
    const user = await this.userRepository.findOneOrFail({ where: { id } });
    if (password) {
      const salt = bcrypt.genSaltSync(10);
      user.password = bcrypt.hashSync(password, salt);
      user.passwordSalt = salt;
    }
    if (roles?.length) {
      const permissions = await this.permissionService.findByIds(roles);
      user.permissions = permissions;
    }
    await user.save();
    await this.userRepository.update(id, data);
    return this.userRepository.findOne({ where: { id } });
  }
}
