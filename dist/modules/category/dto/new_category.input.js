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
exports.UpdateCategoryInput = exports.NewCategoryInput = void 0;
const class_validator_1 = require("class-validator");
const graphql_1 = require("@nestjs/graphql");
let NewCategoryInput = class NewCategoryInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { title: { type: () => String } };
    }
};
__decorate([
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], NewCategoryInput.prototype, "title", void 0);
NewCategoryInput = __decorate([
    (0, graphql_1.InputType)()
], NewCategoryInput);
exports.NewCategoryInput = NewCategoryInput;
let UpdateCategoryInput = class UpdateCategoryInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { title: { nullable: true, type: () => String }, id: { type: () => String } };
    }
};
__decorate([
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], UpdateCategoryInput.prototype, "title", void 0);
UpdateCategoryInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateCategoryInput);
exports.UpdateCategoryInput = UpdateCategoryInput;
//# sourceMappingURL=new_category.input.js.map