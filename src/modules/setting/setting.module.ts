import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Setting } from './entities/setting.entity';
import { SettingRepository } from './repositories/setting.repository';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Setting, SettingRepository])],
})
export class SettingModule {}
