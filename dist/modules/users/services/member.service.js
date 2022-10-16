"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mailer_1 = require("@nestjs-modules/mailer");
const activate_code_repository_1 = require("../repositories/activate-code.repository");
const activate_code_entity_1 = require("../entities/activate-code.entity");
const dayjs_1 = __importDefault(require("dayjs"));
const users_constants_1 = require("../users.constants");
const apollo_server_errors_1 = require("apollo-server-errors");
const member_repository_1 = require("../repositories/member.repository");
const member_entity_1 = require("../entities/member.entity");
let MemberService = class MemberService {
    constructor(memberRepository, mailerService, activateCodeRepository, connection, userModuleOptions) {
        this.memberRepository = memberRepository;
        this.mailerService = mailerService;
        this.activateCodeRepository = activateCodeRepository;
        this.connection = connection;
        this.userModuleOptions = userModuleOptions;
    }
    findByEmail(email) {
        return this.memberRepository.findOneOrFail({ where: { email } });
    }
    findOne(options) {
        return this.memberRepository.findOneOrFail(options);
    }
    findActiveUser(email) {
        return this.memberRepository.findOneOrFail({ where: { email, isActive: true } });
    }
    find(args) {
        return this.memberRepository.find(args);
    }
    findByIds(ids) {
        return this.memberRepository.find({ where: { id: (0, typeorm_1.In)(ids) } });
    }
    pagination(args) {
        return this.memberRepository.paginate({ page: args.page, limit: args.limit, filters: args.filters }, {
            order: {
                createdAt: 'DESC',
            },
        });
    }
    create(data) {
        var _a;
        const salt = bcryptjs_1.default.genSaltSync(10);
        data.password = bcryptjs_1.default.hashSync((_a = data.password) !== null && _a !== void 0 ? _a : '', salt);
        data.passwordSalt = salt;
        data.isActive = true;
        const member = this.memberRepository.create(data);
        return this.memberRepository.save(member);
    }
    register(data) {
        var _a;
        const salt = bcryptjs_1.default.genSaltSync(10);
        data.password = bcryptjs_1.default.hashSync((_a = data.password) !== null && _a !== void 0 ? _a : '', salt);
        data.passwordSalt = salt;
        data.isActive = false;
        const member = this.memberRepository.create(data);
        return this.connection.transaction(async (manager) => {
            var _a;
            const activateCode = Math.floor(100000 + Math.random() * 900000);
            const code = this.activateCodeRepository.create({
                code: `${activateCode}`,
                type: activate_code_entity_1.ActiveCodeEnum.ACTIVATE,
                email: member.email,
                expriedAt: (0, dayjs_1.default)()
                    .add((_a = this.userModuleOptions.codeExpireTime) !== null && _a !== void 0 ? _a : 30, 'minutes')
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
    async activate(email, code) {
        try {
            const activateCode = await this.activateCodeRepository.findOneOrFail({
                where: {
                    email,
                    code,
                    isUsed: false,
                    type: activate_code_entity_1.ActiveCodeEnum.ACTIVATE,
                    expriedAt: (0, typeorm_1.MoreThan)(new Date()),
                },
            });
            await this.connection.transaction(async (manager) => {
                await manager.update(member_entity_1.Member, {
                    email,
                }, {
                    isActive: true,
                });
                await manager.delete(activate_code_entity_1.ActivateCode, {
                    type: activate_code_entity_1.ActiveCodeEnum.ACTIVATE,
                    email: activateCode.email,
                });
            });
            return true;
        }
        catch (_a) {
            return false;
        }
    }
    async login(username, password) {
        const user = await this.memberRepository.findOneOrFail({
            where: { email: username, provider: 'local' },
        });
        if (!user.isActive) {
            throw new apollo_server_errors_1.UserInputError('User is not activate');
        }
        const check = bcryptjs_1.default.compareSync(password, user.password);
        if (check) {
            return user;
        }
        else {
            return false;
        }
    }
    sendMailToActivateAccount(data) {
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
            common_1.Logger.log(success);
        })
            .catch((err) => {
            common_1.Logger.log(err);
        });
    }
    async changePassword(id, currentPassword, newPassword) {
        const member = await this.memberRepository.findOneOrFail({
            where: { id },
        });
        const check = bcryptjs_1.default.compareSync(currentPassword, member.password);
        if (!check) {
            throw new apollo_server_errors_1.UserInputError('The current password is not match');
        }
        else {
            if (bcryptjs_1.default.compareSync(newPassword, member.password)) {
                throw new apollo_server_errors_1.UserInputError('The new password must be different from the current password');
            }
            const salt = bcryptjs_1.default.genSaltSync(10);
            const password = bcryptjs_1.default.hashSync(newPassword, salt);
            member.password = password;
            member.passwordSalt = salt;
            await member.save();
            return true;
        }
    }
    async requestForgotPassword(email) {
        const member = await this.memberRepository.findOneOrFail({ where: { email } });
        await this.connection.transaction(async (manager) => {
            var _a;
            const activateCode = Math.floor(100000 + Math.random() * 900000);
            const code = this.activateCodeRepository.create({
                code: `${activateCode}`,
                email: member.email,
                type: activate_code_entity_1.ActiveCodeEnum.FORGOT,
                expriedAt: (0, dayjs_1.default)()
                    .add((_a = this.userModuleOptions.codeExpireTime) !== null && _a !== void 0 ? _a : 30, 'minutes')
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
                common_1.Logger.log(success);
            })
                .catch((err) => {
                common_1.Logger.log(err);
            });
            await manager.save(code);
        });
        return true;
    }
    async setForgotPassword(code, newPassword) {
        try {
            const activateCode = await this.activateCodeRepository.findOneOrFail({
                where: {
                    code,
                    isUsed: false,
                    expriedAt: (0, typeorm_1.MoreThan)(new Date()),
                },
            });
            await this.connection.transaction(async (manager) => {
                const salt = bcryptjs_1.default.genSaltSync(10);
                const password = bcryptjs_1.default.hashSync(newPassword, salt);
                await manager.update(member_entity_1.Member, {
                    email: activateCode.email,
                }, {
                    password,
                    passwordSalt: salt,
                });
                await manager.delete(activate_code_entity_1.ActivateCode, {
                    type: activate_code_entity_1.ActiveCodeEnum.FORGOT,
                    email: activateCode.email,
                });
            });
            return true;
        }
        catch (_a) {
            return false;
        }
    }
    async updateInfo(id, input) {
        try {
            await this.memberRepository.update(id, input);
            return this.memberRepository.findOne({ where: { id } });
        }
        catch (err) {
            throw new apollo_server_errors_1.ApolloError(err.message);
        }
    }
};
MemberService = __decorate([
    (0, common_1.Injectable)(),
    __param(4, (0, common_1.Inject)(users_constants_1.USER_MODULE_OPTIONS)),
    __metadata("design:paramtypes", [member_repository_1.MemberRepository,
        mailer_1.MailerService,
        activate_code_repository_1.ActivateCodeRepository,
        typeorm_1.Connection, Object])
], MemberService);
exports.MemberService = MemberService;
//# sourceMappingURL=member.service.js.map