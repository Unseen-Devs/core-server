import { Inject, Injectable, Logger } from '@nestjs/common';
import { Connection, DeepPartial, FindManyOptions, FindOneOptions, In, MoreThan } from 'typeorm';
import bcrypt from 'bcryptjs';
import { MailerService } from '@nestjs-modules/mailer';
import { PaginationArgs } from 'src/graphql/types/common.args';
import { ActivateCodeRepository } from '../repositories/activate-code.repository';
import { ActivateCode, ActiveCodeEnum } from '../entities/activate-code.entity';
import dayjs from 'dayjs';
import { UserModuleOptions, USER_MODULE_OPTIONS } from '../users.constants';
import { ApolloError, UserInputError } from 'apollo-server-errors';
import { MemberRepository } from '../repositories/member.repository';
import { Member } from '../entities/member.entity';
import { UpdateMemberInfoInput } from '../dto/member.input';

@Injectable()
export class MemberService {
  constructor(
    private readonly memberRepository: MemberRepository,
    private readonly mailerService: MailerService,
    private readonly activateCodeRepository: ActivateCodeRepository,
    private readonly connection: Connection,
    @Inject(USER_MODULE_OPTIONS)
    private readonly userModuleOptions: UserModuleOptions,
  ) {}

  findByEmail(email: string) {
    return this.memberRepository.findOneOrFail({ where: { email } });
  }

  findOne(options: FindOneOptions<Member>) {
    return this.memberRepository.findOneOrFail(options);
  }

  findActiveUser(email: string) {
    return this.memberRepository.findOneOrFail({ where: { email, isActive: true } });
  }

  find(args: FindManyOptions<Member>) {
    return this.memberRepository.find(args);
  }

  findByIds(ids: string[]) {
    return this.memberRepository.find({ where: { id: In(ids) } });
  }

  pagination(args: PaginationArgs) {
    return this.memberRepository.paginate(
      { page: args.page, limit: args.limit, filters: args.filters },
      {
        order: {
          createdAt: 'DESC',
        },
      },
    );
  }

  create(data: DeepPartial<Member>) {
    const salt = bcrypt.genSaltSync(10);
    data.password = bcrypt.hashSync(data.password ?? '', salt);
    data.passwordSalt = salt;
    data.isActive = true;
    const member = this.memberRepository.create(data);
    return this.memberRepository.save(member);
  }

  register(data: DeepPartial<Member>) {
    const salt = bcrypt.genSaltSync(10);
    data.password = bcrypt.hashSync(data.password ?? '', salt);
    data.passwordSalt = salt;
    data.isActive = false;
    const member = this.memberRepository.create(data);

    return this.connection.transaction(async (manager) => {
      const activateCode = Math.floor(100000 + Math.random() * 900000);
      const code = this.activateCodeRepository.create({
        code: `${activateCode}`,
        type: ActiveCodeEnum.ACTIVATE,
        email: member.email,
        expriedAt: dayjs()
          .add(this.userModuleOptions.codeExpireTime ?? 30, 'minutes')
          .toDate(),
      });
      await manager.save(code);
      this.sendMailToActivateAccount({
        code: activateCode.toString(),
        email: member.email,
        fullName: [member.firstName, member.lastName].filter(Boolean).join(' '),
      });
      return manager.save(member);
    });
  }

  /**
   *
   * @param email `string` Email
   * @param code string
   * @returns Boolean
   */
  async activate(email: string, code: string) {
    try {
      const activateCode = await this.activateCodeRepository.findOneOrFail({
        where: {
          email,
          code,
          isUsed: false,
          type: ActiveCodeEnum.ACTIVATE,
          expriedAt: MoreThan(new Date()),
        },
      });
      await this.connection.transaction(async (manager) => {
        await manager.update(
          Member,
          {
            email,
          },
          {
            isActive: true,
          },
        );
        await manager.delete(ActivateCode, {
          type: ActiveCodeEnum.ACTIVATE,
          email: activateCode.email,
        });
      });

      return true;
    } catch {
      return false;
    }
  }

  async login(username: string, password: string) {
    const user = await this.memberRepository.findOneOrFail({
      where: { email: username, provider: 'local' },
    });
    if (!user.isActive) {
      throw new UserInputError('User is not activate');
    }
    const check = bcrypt.compareSync(password, user.password);
    if (check) {
      return user;
    } else {
      return false;
    }
  }

  sendMailToActivateAccount(data: { fullName: string; email: string; code: string }) {
    this.mailerService
      .sendMail({
        to: data.email,
        from: process.env.EMAIL_SERVER_SENDER_FROM,
        subject: 'Activate account',
        template: 'activate-account',
        context: {
          code: data.code,
          fullName: data.fullName,
        },
      })
      .then((success) => {
        Logger.log(success);
      })
      .catch((err) => {
        Logger.log(err);
      });
  }

  async changePassword(id: string, currentPassword: string, newPassword: string) {
    const member = await this.memberRepository.findOneOrFail({
      where: { id },
    });

    const check = bcrypt.compareSync(currentPassword, member.password);
    if (!check) {
      throw new UserInputError('The current password is not match');
    } else {
      if (bcrypt.compareSync(newPassword, member.password)) {
        //
        throw new UserInputError('The new password must be different from the current password');
      }
      const salt = bcrypt.genSaltSync(10);
      const password = bcrypt.hashSync(newPassword, salt);
      member.password = password;
      member.passwordSalt = salt;
      await member.save();
      return true;
    }
  }

  async requestForgotPassword(email: string) {
    const member = await this.memberRepository.findOneOrFail({ where: { email } });
    await this.connection.transaction(async (manager) => {
      const activateCode = Math.floor(100000 + Math.random() * 900000);
      const code = this.activateCodeRepository.create({
        code: `${activateCode}`,
        email: member.email,
        type: ActiveCodeEnum.FORGOT,
        expriedAt: dayjs()
          .add(this.userModuleOptions.codeExpireTime ?? 30, 'minutes')
          .toDate(),
      });
      this.mailerService
        .sendMail({
          to: member.email,
          from: process.env.EMAIL_SERVER_SENDER_FROM,
          subject: 'Forgot Password',
          template: `forgot-password`,
          context: {
            code: activateCode,
            fullName: [member.firstName, member.lastName].filter(Boolean).join(' '),
          },
        })
        .then((success) => {
          Logger.log(success);
        })
        .catch((err) => {
          Logger.log(err);
        });
      await manager.save(code);
    });
    return true;
  }

  async setForgotPassword(code: string, newPassword: string) {
    try {
      const activateCode = await this.activateCodeRepository.findOneOrFail({
        where: {
          code,
          isUsed: false,
          expriedAt: MoreThan(new Date()),
        },
      });
      await this.connection.transaction(async (manager) => {
        const salt = bcrypt.genSaltSync(10);
        const password = bcrypt.hashSync(newPassword, salt);
        await manager.update(
          Member,
          {
            email: activateCode.email,
          },
          {
            password,
            passwordSalt: salt,
          },
        );
        await manager.delete(ActivateCode, {
          type: ActiveCodeEnum.FORGOT,
          email: activateCode.email,
        });
      });

      return true;
    } catch {
      return false;
    }
  }

  async updateInfo(id: string, input: UpdateMemberInfoInput) {
    try {
      await this.memberRepository.update(id, input);
      return this.memberRepository.findOne({ where: { id } });
    } catch (err: any) {
      throw new ApolloError(err.message);
    }
  }
}
