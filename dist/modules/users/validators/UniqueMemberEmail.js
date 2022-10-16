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
exports.UniqueMemberEmail = void 0;
const class_validator_1 = require("class-validator");
const common_1 = require("@nestjs/common");
const member_service_1 = require("../services/member.service");
let UniqueMemberEmail = class UniqueMemberEmail {
    constructor(memberService) {
        this.memberService = memberService;
    }
    async validate(value, args) {
        try {
            const user = await this.memberService.findByEmail(value);
            return !user;
        }
        catch (err) {
            return true;
        }
    }
    defaultMessage(args) {
        return `User already exists!`;
    }
};
UniqueMemberEmail = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: true, name: 'UniqueMemberEmail' }),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [member_service_1.MemberService])
], UniqueMemberEmail);
exports.UniqueMemberEmail = UniqueMemberEmail;
//# sourceMappingURL=UniqueMemberEmail.js.map