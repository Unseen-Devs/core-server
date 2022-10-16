"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonRepository = exports.decodeCursor = exports.encodeCursor = exports.InvalidCursorError = exports.InvalidCursorTypeError = void 0;
const typeorm_1 = require("typeorm");
const opaqueid_1 = require("opaqueid");
const resolve_pagination_1 = require("../../helpers/resolve-pagination");
class InvalidCursorTypeError extends Error {
    constructor(expectedType, actualType) {
        super();
        this.expectedType = expectedType;
        this.actualType = actualType;
        this.name = 'Invalid Cursor Type Error';
        this.message = `Invalid cursor, expected type ${expectedType}, but got type ${actualType}`;
    }
}
exports.InvalidCursorTypeError = InvalidCursorTypeError;
class InvalidCursorError extends Error {
    constructor() {
        super();
        this.name = 'Invalid Cursor Error';
        this.message = 'Invalid cursor';
    }
}
exports.InvalidCursorError = InvalidCursorError;
function encodeCursor(id, type, index) {
    return (0, opaqueid_1.encode)(`C|${type}|${id}|${index}`);
}
exports.encodeCursor = encodeCursor;
function decodeCursor(cursor, type) {
    const [cursorPrefix, cursorType, id, index] = (0, opaqueid_1.decode)(cursor).split('|');
    if (cursorPrefix !== 'C')
        throw new InvalidCursorError();
    if (cursorType !== type)
        throw new InvalidCursorTypeError(type, cursorType);
    return {
        id,
        type: cursorType,
        index: parseInt(index, 10),
    };
}
exports.decodeCursor = decodeCursor;
let CommonRepository = class CommonRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.paginateCursor = async (options, findOptions) => {
            let skip = 0;
            let decodedCursor = {
                id: '',
                type: '',
                index: 1,
            };
            if (findOptions.after) {
                decodedCursor = decodeCursor(findOptions.after, findOptions.type);
                skip = decodedCursor.index;
            }
            const [results, totalCount] = await this.findAndCount(Object.assign(Object.assign({}, options), { skip }));
            if (decodedCursor && findOptions.validateCursor) {
                if (decodedCursor.id !== results[0][findOptions.cursorKey])
                    throw new InvalidCursorError();
            }
            const edges = results.map((node, i) => ({
                node,
                cursor: encodeCursor(node[findOptions.cursorKey], findOptions.type, i + 1 + skip),
            }));
            const pageInfo = {
                startCursor: edges[0] ? edges[0].cursor : null,
                endCursor: edges[edges.length - 1] ? edges[edges.length - 1].cursor : null,
                hasNextPage: results.length + skip < totalCount,
                hasPrevPage: skip !== 0,
            };
            return {
                pageInfo,
                edges,
                totalCount,
            };
        };
    }
    async paginate(data, searchOptions, cb) {
        const { page, limit, query } = (0, resolve_pagination_1.resolveOptions)(data);
        const options = cb ? cb(Object.assign(Object.assign({}, searchOptions), { where: query })) : Object.assign(Object.assign({}, searchOptions), { where: query });
        const [items, total] = await this.findAndCount(Object.assign({ skip: limit * (page - 1), take: limit }, options));
        return (0, resolve_pagination_1.createPaginationObject)(items, total, page, limit);
    }
    async paginateQueryBuilder(queryBuilder, options) {
        const { page, limit } = (0, resolve_pagination_1.resolveOptions)(options);
        const [items, total] = await queryBuilder
            .take(limit)
            .skip((page - 1) * limit)
            .getManyAndCount();
        return (0, resolve_pagination_1.createPaginationObject)(items, total, page, limit);
    }
};
CommonRepository = __decorate([
    (0, typeorm_1.EntityRepository)()
], CommonRepository);
exports.CommonRepository = CommonRepository;
//# sourceMappingURL=common.repository.js.map