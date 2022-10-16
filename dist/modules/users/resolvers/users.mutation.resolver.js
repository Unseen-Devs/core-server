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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersMutationResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const users_entity_1 = require("../entities/users.entity");
const new_user_input_1 = require("../dto/new_user.input");
const common_decorator_1 = require("../../../decorators/common.decorator");
const user_crud_service_1 = require("../services/user-crud.service");
let UsersMutationResolver = class UsersMutationResolver {
    constructor(userCRUDService) {
        this.userCRUDService = userCRUDService;
    }
    createUser(input) {
        return this.userCRUDService.create(input);
    }
    updateUser(id, input) {
        return this.userCRUDService.update(id, input);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => users_entity_1.User, {
        description: 'Require `CREATE_USER` permission',
    }),
    (0, common_decorator_1.Allow)('CREATE_USER'),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [new_user_input_1.NewUserInput]),
    __metadata("design:returntype", void 0)
], UsersMutationResolver.prototype, "createUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => users_entity_1.User, {
        description: 'Require `UPDATE_USER` permission',
    }),
    (0, common_decorator_1.Allow)('UPDATE_USER'),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, new_user_input_1.UpdateUserInput]),
    __metadata("design:returntype", void 0)
], UsersMutationResolver.prototype, "updateUser", null);
UsersMutationResolver = __decorate([
    (0, graphql_1.Resolver)(() => users_entity_1.User),
    __metadata("design:paramtypes", [user_crud_service_1.UserCRUDService])
], UsersMutationResolver);
exports.UsersMutationResolver = UsersMutationResolver;
//# sourceMappingURL=users.mutation.resolver.js.map