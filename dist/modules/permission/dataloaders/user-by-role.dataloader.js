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
exports.UserByRoleDataLoader = void 0;
const dataloader_1 = __importDefault(require("dataloader"));
const common_1 = require("@nestjs/common");
const role_repository_1 = require("../repositories/role.repository");
const typeorm_1 = require("typeorm");
let UserByRoleDataLoader = class UserByRoleDataLoader extends dataloader_1.default {
    constructor(roleRepository) {
        super(async (ids) => {
            try {
                const rows = await this.roleRepository.find({
                    relations: ['users'],
                    where: {
                        id: (0, typeorm_1.In)([...ids]),
                    },
                });
                return ids.map((id) => {
                    const role = rows.find((x) => x.id == id);
                    if (!role)
                        return new Error('Role not found');
                    return role.users;
                });
            }
            catch (_a) {
                return [];
            }
        });
        this.roleRepository = roleRepository;
    }
};
UserByRoleDataLoader = __decorate([
    (0, common_1.Injectable)({
        scope: common_1.Scope.REQUEST,
    }),
    __metadata("design:paramtypes", [role_repository_1.RoleRepository])
], UserByRoleDataLoader);
exports.UserByRoleDataLoader = UserByRoleDataLoader;
//# sourceMappingURL=user-by-role.dataloader.js.map