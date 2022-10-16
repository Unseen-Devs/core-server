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
exports.RoleDataLoader = void 0;
const dataloader_1 = __importDefault(require("dataloader"));
const common_1 = require("@nestjs/common");
const role_repository_1 = require("../repositories/role.repository");
let RoleDataLoader = class RoleDataLoader extends dataloader_1.default {
    constructor(roleRepository) {
        super(async (ids) => {
            const rows = await this.roleRepository.findByIds([...ids]);
            return ids.map((id) => rows.find((x) => x.id == id) || new Error('Role not found'));
        });
        this.roleRepository = roleRepository;
    }
};
RoleDataLoader = __decorate([
    (0, common_1.Injectable)({
        scope: common_1.Scope.REQUEST,
    }),
    __metadata("design:paramtypes", [role_repository_1.RoleRepository])
], RoleDataLoader);
exports.RoleDataLoader = RoleDataLoader;
//# sourceMappingURL=role.dataloader.js.map