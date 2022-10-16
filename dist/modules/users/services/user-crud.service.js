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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCRUDService = void 0;
const common_1 = require("@nestjs/common");
const users_repository_1 = require("../repositories/users.repository");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const permission_service_1 = require("../../permission/services/permission.service");
let UserCRUDService = class UserCRUDService {
    constructor(userRepository, permissionService) {
        this.userRepository = userRepository;
        this.permissionService = permissionService;
    }
    async create(data) {
        const salt = bcryptjs_1.default.genSaltSync(10);
        data.password = bcryptjs_1.default.hashSync(data.password, salt);
        const user = this.userRepository.create(Object.assign(Object.assign({}, data), { passwordSalt: salt }));
        if (data.roles) {
            const permissions = await this.permissionService.findByIds(data.roles);
            user.permissions = permissions;
        }
        return this.userRepository.save(user);
    }
    async update(id, _a) {
        var { roles, password } = _a, data = __rest(_a, ["roles", "password"]);
        const user = await this.userRepository.findOneOrFail({ where: { id } });
        if (password) {
            const salt = bcryptjs_1.default.genSaltSync(10);
            user.password = bcryptjs_1.default.hashSync(password, salt);
            user.passwordSalt = salt;
        }
        if (roles === null || roles === void 0 ? void 0 : roles.length) {
            const permissions = await this.permissionService.findByIds(roles);
            user.permissions = permissions;
        }
        await user.save();
        await this.userRepository.update(id, data);
        return this.userRepository.findOne({ where: { id } });
    }
};
UserCRUDService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UserRepository, permission_service_1.PermissionService])
], UserCRUDService);
exports.UserCRUDService = UserCRUDService;
//# sourceMappingURL=user-crud.service.js.map