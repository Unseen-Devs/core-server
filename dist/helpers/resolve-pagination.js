"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaginationObject = exports.resolveOptions = void 0;
const typeorm_1 = require("typeorm");
function resolveOptions(options) {
    var _a, _b;
    const page = (_a = options.page) !== null && _a !== void 0 ? _a : 1;
    const limit = (_b = options.limit) !== null && _b !== void 0 ? _b : 15;
    const offset = (page - 1) * limit;
    const query = generateQueryByFilter(options.filters);
    return { page, limit, query, offset };
}
exports.resolveOptions = resolveOptions;
const generateQueryByFilter = (filters) => {
    const where = {};
    filters === null || filters === void 0 ? void 0 : filters.map((filter) => {
        switch (filter.operator) {
            case 'EQ':
                where[filter.field] = (0, typeorm_1.Equal)(filter.value);
                break;
            case 'CONTAINS':
                where[filter.field] = (0, typeorm_1.Like)(`%${filter.value}%`);
                break;
            case 'NE':
                where[filter.field] = (0, typeorm_1.Not)(filter.value);
                break;
            case 'GREATERTHAN':
                where[filter.field] = (0, typeorm_1.MoreThan)(filter.value);
                break;
            case 'GREATERTHAN_EQ':
                where[filter.field] = (0, typeorm_1.MoreThanOrEqual)(filter.value);
                break;
            case 'LESSTHAN':
                where[filter.field] = (0, typeorm_1.LessThan)(filter.value);
                break;
            case 'LESSTHAN_EQ':
                where[filter.field] = (0, typeorm_1.LessThanOrEqual)(filter.value);
                break;
            case 'BETWEEN': {
                const vals = filter.value.split(':');
                if (vals.length === 2) {
                    where[filter.field] = (0, typeorm_1.Between)(vals[0], vals[1]);
                }
                break;
            }
            default:
                break;
        }
        return true;
    });
    return where;
};
function createPaginationObject(items, totalItems, currentPage, limit) {
    const totalPages = Math.ceil(totalItems / limit);
    return {
        items,
        meta: {
            totalItems: totalItems,
            itemCount: items.length,
            itemsPerPage: limit,
            totalPages: totalPages,
            currentPage: currentPage,
        },
    };
}
exports.createPaginationObject = createPaginationObject;
//# sourceMappingURL=resolve-pagination.js.map