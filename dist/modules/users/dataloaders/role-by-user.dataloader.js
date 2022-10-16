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
exports.RoleByUserDataLoader = void 0;
const dataloader_1 = __importDefault(require("dataloader"));
const common_1 = require("@nestjs/common");
const users_repository_1 = require("../repositories/users.repository");
const typeorm_1 = require("typeorm");
let RoleByUserDataLoader = class RoleByUserDataLoader extends dataloader_1.default {
    constructor(userRepository) {
        super(async (ids) => {
            try {
                const rows = await this.userRepository.find({
                    relations: ['permissions'],
                    where: {
                        id: (0, typeorm_1.In)([...ids]),
                    },
                });
                return ids.map((id) => {
                    const row = rows.find((x) => x.id == id);
                    if (!row)
                        return new Error('Role not found');
                    return row.permissions;
                });
            }
            catch (err) {
                return ids.map((id) => new Error(`User ${id} not found`));
            }
        });
        this.userRepository = userRepository;
    }
};
RoleByUserDataLoader = __decorate([
    (0, common_1.Injectable)({
        scope: common_1.Scope.REQUEST,
    }),
    __metadata("design:paramtypes", [users_repository_1.UserRepository])
], RoleByUserDataLoader);
exports.RoleByUserDataLoader = RoleByUserDataLoader;
//# sourceMappingURL=role-by-user.dataloader.js.map