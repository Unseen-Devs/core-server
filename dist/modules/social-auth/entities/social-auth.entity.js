"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialUser = void 0;
const graphql_1 = require("@nestjs/graphql");
let SocialUser = class SocialUser {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => String }, email: { type: () => String }, phone_number: { nullable: true, type: () => String }, name: { nullable: true, type: () => String }, first_name: { nullable: true, type: () => String }, last_name: { nullable: true, type: () => String }, avatar: { nullable: true, type: () => String } };
    }
};
SocialUser = __decorate([
    (0, graphql_1.ObjectType)({
        description: 'SocialUser',
    })
], SocialUser);
exports.SocialUser = SocialUser;
//# sourceMappingURL=social-auth.entity.js.map