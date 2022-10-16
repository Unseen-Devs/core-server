"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const dotenv_1 = require("dotenv");
const dotenv_expand_1 = require("dotenv-expand");
const env = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const envs = [`.env.${env}`, '.env'];
envs.map((file) => {
    const filePath = (0, path_1.resolve)(process.cwd(), file);
    if ((0, fs_1.existsSync)(filePath)) {
        (0, dotenv_expand_1.expand)((0, dotenv_1.config)({ path: filePath }));
    }
});
//# sourceMappingURL=dotenv-config.js.map