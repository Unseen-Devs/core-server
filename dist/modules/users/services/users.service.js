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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const users_repository_1 = require("../repositories/users.repository");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const apollo_server_errors_1 = require("apollo-server-errors");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    findOne(option) {
        return this.userRepository.findOneOrFail(option);
    }
    findByEmail(email) {
        return this.userRepository.findOneOrFail({ where: { email } });
    }
    findActiveUser(email) {
        return this.userRepository.findOneOrFail({ where: { email, isActive: true } });
    }
    find(args) {
        return this.userRepository.find(args);
    }
    findByIds(ids) {
        return this.userRepository.find({ where: { id: (0, typeorm_1.In)(ids) } });
    }
    pagination(args) {
        let builder = this.userRepository.createQueryBuilder('users').select();
        if (args.s) {
            builder = builder
                .where('users.firstName ILIKE :searchQuery', { searchQuery: `%${args.s}%` })
                .orWhere('users.lastName ILIKE :searchQuery', { searchQuery: `%${args.s}%` });
        }
        builder = builder.orderBy('users.createdAt', 'DESC');
        return this.userRepository.paginateQueryBuilder(builder, args);
    }
    async login(username, password) {
        const user = await this.userRepository.findOneOrFail({
            where: { email: username },
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
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UserRepository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map