"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userHasMultiRoles = exports.userHasRole = void 0;
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
