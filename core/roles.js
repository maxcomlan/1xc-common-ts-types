"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userHasMultiRoles = exports.userHasRole = exports.ScopedRoleList = void 0;
exports.ScopedRoleList = [
    "user:profile:read",
    "user:profile:activate",
    "user:profile:block",
    "user:profile:.*",
    "user:business:read",
    "user:business:allow",
    "user:business:block",
    "user:business:delete",
    "user:business:.*",
    "ticket:details:read",
    "ticket:status:approve",
    "ticket:status:abort",
    "ticket:transaction:read",
    "ticket:status:.*",
    "ticket:transaction:.*",
    "ticket:.*:.*",
    "wallet:details:read",
    "wallet:balance:credit",
    "wallet:balance:debit",
    "wallet:transfer:read",
    "wallet:history:read",
    "wallet:balance:.*",
    "wallet:.*:.*",
    "investment:network:read",
    "investment:network:.*",
    "system:method:read",
    "system:method:create",
    "system:method:update",
    "system:method:delete",
    "system:method:.*",
    "system:methodaccount:read",
    "system:methodaccount:create",
    "system:methodaccount:update",
    "system:methodaccount:delete",
    "system:methodaccount:.*",
    "system:property:read",
    "system:property:update",
    "system:property:.*",
    "system:admin:read",
    "system:admin:create",
    "system:admin:disable",
    "system:admin:enable",
    "system:admin:.*",
    "admin:role:read",
    "admin:role:update",
    "admin:role:*",
    "system:event:read",
    "system:log:read",
    "user:.*:.*",
    "system:.*:.*",
    ".*:.*:.*"
];
function userHasRole(needle, haystack) {
    for (let i = 0; i < haystack.length; i++) {
        let reg = new RegExp(`^${haystack[i]}$`);
        if (reg.test(needle)) {
            return true;
        }
    }
    return false;
}
exports.userHasRole = userHasRole;
function userHasMultiRoles(needles, haystack) {
    for (let i = 0; i < needles.length; i++) {
        if (!userHasRole(needles[i], haystack)) {
            return false;
        }
    }
    return true;
}
exports.userHasMultiRoles = userHasMultiRoles;
