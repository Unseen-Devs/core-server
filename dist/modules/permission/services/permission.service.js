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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const role_repository_1 = require("../repositories/role.repository");
const users_service_1 = require("../../users/services/users.service");
let PermissionService = class PermissionService {
    constructor(roleRepository, userService) {
        this.roleRepository = roleRepository;
        this.userService = userService;
        this.create = (data) => {
            const role = this.roleRepository.create(data);
            return this.roleRepository.save(role);
        };
        this.update = async (id, data) => {
            await this.roleRepository.update(id, data);
            return this.findOne(id);
        };
        this.findOne = async (id) => {
            return this.roleRepository.findOneOrFail({ where: { id } });
        };
    }
    findByIds(ids) {
        return this.roleRepository.findByIds(ids);
    }
    async remove(id) {
        await this.roleRepository.delete(id);
        return true;
    }
    async pagination(args) {
        return this.roleRepository.paginate(args);
    }
    async addUsersToRole(roleId, userIds) {
        try {
            const role = await this.roleRepository.findOne({
                where: { id: roleId },
                relations: ['users'],
            });
            if (!role)
                throw new common_1.NotFoundException('Role not found');
            const users = await this.userService.find({
                where: {
                    id: (0, typeorm_1.In)(userIds),
                    isSuperAdmin: false,
                },
            });
            role.users.push(...users);
            return role.save();
        }
        catch (err) {
            throw err;
        }
    }
    async removeUsersToRole(roleId, userIds) {
        try {
            const role = await this.roleRepository.findOne({
                relations: ['users'],
                where: {
                    id: roleId,
                },
            });
            if (role === null || role === void 0 ? void 0 : role.users) {
                role.users = role === null || role === void 0 ? void 0 : role.users.filter((v) => !userIds.includes(v.id));
                return this.roleRepository.save(role);
            }
            return role;
        }
        catch (err) {
            throw err;
        }
    }
};
PermissionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [role_repository_1.RoleRepository, users_service_1.UsersService])
], PermissionService);
exports.PermissionService = PermissionService;
//# sourceMappingURL=permission.service.js.map