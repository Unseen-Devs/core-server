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
exports.AddUsersToRoleInput = exports.EditRoleInput = exports.NewRoleInput = void 0;
const class_validator_1 = require("class-validator");
const graphql_1 = require("@nestjs/graphql");
let NewRoleInput = class NewRoleInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { name: { type: () => String }, roles: { nullable: true, type: () => [String] } };
    }
};
__decorate([
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], NewRoleInput.prototype, "name", void 0);
NewRoleInput = __decorate([
    (0, graphql_1.InputType)()
], NewRoleInput);
exports.NewRoleInput = NewRoleInput;
let EditRoleInput = class EditRoleInput extends (0, graphql_1.PartialType)(NewRoleInput) {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => String } };
    }
};
EditRoleInput = __decorate([
    (0, graphql_1.InputType)()
], EditRoleInput);
exports.EditRoleInput = EditRoleInput;
let AddUsersToRoleInput = class AddUsersToRoleInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { userIds: { type: () => [String] }, roleId: { type: () => String } };
    }
};
AddUsersToRoleInput = __decorate([
    (0, graphql_1.InputType)()
], AddUsersToRoleInput);
exports.AddUsersToRoleInput = AddUsersToRoleInput;
//# sourceMappingURL=new_role.input.js.map