"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissionKeys = exports.permissions = void 0;
exports.permissions = [
    {
        label: 'Create role',
        key: 'CREATE_ROLE',
        group: 'role',
    },
    {
        label: 'Update Role',
        key: 'UPDATE_ROLE',
        group: 'role',
    },
    {
        label: 'Delete role',
        key: 'DELETE_ROLE',
        group: 'role',
    },
    {
        label: 'View list role',
        key: 'LIST_ROLE',
        group: 'role',
    },
    {
        label: 'View list user',
        key: 'LIST_USER',
        group: 'user',
    },
    {
        label: 'Create user',
        key: 'CREATE_USER',
        group: 'user',
    },
    {
        label: 'Update user',
        key: 'UPDATE_USER',
        group: 'user',
    },
    {
        label: 'Create Media',
        key: 'CREATE_MEDIA',
        group: 'media',
    },
    {
        label: 'Read Media',
        key: 'READ_MEDIA',
        group: 'media',
    },
    {
        label: 'Update Media',
        key: 'UPDATE_MEDIA',
        group: 'media',
    },
    {
        label: 'Delete Media',
        key: 'DELETE_MEDIA',
        group: 'media',
    },
];
exports.permissionKeys = exports.permissions.map((v) => v.key);
//# sourceMappingURL=permissions.js.map