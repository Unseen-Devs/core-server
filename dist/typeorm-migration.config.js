"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./dotenv-config");
const typeorm_config_1 = require("./typeorm.config");
const migrationConfig = Object.assign(Object.assign({}, typeorm_config_1.typeORMConfig), { migrations: ['src/migration/**/*.ts'] });
exports.default = migrationConfig;
//# sourceMappingURL=typeorm-migration.config.js.map