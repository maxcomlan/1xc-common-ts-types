"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const roles_1 = require("../src/roles");
describe("Test role validator", () => {
    test("User has role", () => {
        expect(roles_1.userHasRole("system:property:read", [".*:.*:.*"])).toBe(true);
    });
    test("User with multiple roles", () => {
        expect(roles_1.userHasMultiRoles(["system:property:read", "system:property:update"], [".*:.*:.*"])).toBe(true);
    });
});
