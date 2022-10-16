"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onlyUniqueString = exports.decode = exports.encode = exports.snowflake = void 0;
const sonyflake_1 = require("sonyflake");
exports.snowflake = new sonyflake_1.Sonyflake({
    machineId: 1,
    epoch: sonyflake_1.Epoch.TWITTER,
});
const encode = (str) => {
    return Buffer.from(str, 'utf8').toString('base64');
};
exports.encode = encode;
const decode = (str) => {
    return Buffer.from(str, 'base64').toString('utf8');
};
exports.decode = decode;
function onlyUniqueString(value, index, self) {
    return self.indexOf(value) === index;
}
exports.onlyUniqueString = onlyUniqueString;
//# sourceMappingURL=common.js.map