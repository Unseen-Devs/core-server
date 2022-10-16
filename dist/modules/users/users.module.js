"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var UsersModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_service_1 = require("./services/users.service");
const users_repository_1 = require("./repositories/users.repository");
const users_entity_1 = require("./entities/users.entity");
const users_resolver_1 = require("./resolvers/users.resolver");
const users_dataloader_1 = require("./dataloaders/users.dataloader");
const users_mutation_resolver_1 = require("./resolvers/users.mutation.resolver");
const role_by_user_dataloader_1 = require("./dataloaders/role-by-user.dataloader");
const permission_by_user_dataloader_1 = require("./dataloaders/permission-by-user.dataloader");
const UniqueEmail_1 = require("./validators/UniqueEmail");
const activate_code_entity_1 = require("./entities/activate-code.entity");
const activate_code_repository_1 = require("./repositories/activate-code.repository");
const users_constants_1 = require("./users.constants");
const member_entity_1 = require("./entities/member.entity");
const member_repository_1 = require("./repositories/member.repository");
const member_mutation_resolver_1 = require("./resolvers/member.mutation.resolver");
const UniqueMemberEmail_1 = require("./validators/UniqueMemberEmail");
const member_service_1 = require("./services/member.service");
const member_fields_resolver_1 = require("./resolvers/member.fields.resolver");
const user_crud_service_1 = require("./services/user-crud.service");
const permission_module_1 = require("../permission/permission.module");
let UsersModule = UsersModule_1 = class UsersModule {
    static register(options) {
        return {
            module: UsersModule_1,
            providers: [
                {
                    provide: users_constants_1.USER_MODULE_OPTIONS,
                    useValue: options,
                },
                member_service_1.MemberService,
                UniqueMemberEmail_1.UniqueMemberEmail,
            ],
            exports: [member_service_1.MemberService, UniqueMemberEmail_1.UniqueMemberEmail],
        };
    }
};
UsersModule = UsersModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([users_entity_1.User, activate_code_entity_1.ActivateCode, users_repository_1.UserRepository, activate_code_repository_1.ActivateCodeRepository, member_entity_1.Member, member_repository_1.MemberRepository]),
            permission_module_1.PermissionModule,
        ],
        providers: [
            users_dataloader_1.UserDataLoader,
            users_service_1.UsersService,
            user_crud_service_1.UserCRUDService,
            users_resolver_1.UsersResolver,
            users_mutation_resolver_1.UsersMutationResolver,
            member_mutation_resolver_1.MemberMutationResolver,
            member_fields_resolver_1.MemberFieldsResolver,
            role_by_user_dataloader_1.RoleByUserDataLoader,
            permission_by_user_dataloader_1.PermissionByUserDataLoader,
            UniqueEmail_1.UniqueEmail,
        ],
        exports: [users_service_1.UsersService, user_crud_service_1.UserCRUDService, users_dataloader_1.UserDataLoader, role_by_user_dataloader_1.RoleByUserDataLoader, UniqueEmail_1.UniqueEmail],
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map