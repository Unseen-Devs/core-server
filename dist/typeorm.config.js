"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeORMConfig = void 0;
const blog_entity_1 = require("./modules/blogs/entities/blog.entity");
const users_entity_1 = require("./modules/users/entities/users.entity");
const category_entity_1 = require("./modules/category/entities/category.entity");
const auth_entity_1 = require("./modules/auth/entities/auth.entity");
const media_entity_1 = require("./modules/media/entities/media.entity");
const role_entity_1 = require("./modules/permission/entities/role.entity");
const setting_entity_1 = require("./modules/setting/entities/setting.entity");
const activate_code_entity_1 = require("./modules/users/entities/activate-code.entity");
const member_entity_1 = require("./modules/users/entities/member.entity");
exports.typeORMConfig = {
    type: 'postgres',
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: process.env.DATABASE_SYNC === 'true',
    entities: [blog_entity_1.BlogEntity, users_entity_1.User, member_entity_1.Member, activate_code_entity_1.ActivateCode, category_entity_1.Category, media_entity_1.MediaEntity, auth_entity_1.AuthTokenEntity, role_entity_1.Role, setting_entity_1.Setting],
    logging: process.env.DATABASE_LOGGING === 'true',
    useUTC: true,
};
//# sourceMappingURL=typeorm.config.js.map