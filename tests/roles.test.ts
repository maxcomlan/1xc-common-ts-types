import { userHasMultiRoles, userHasRole } from "../src/roles";

describe("Test role validator", () => {
    test("User has role", () => {
        expect(userHasRole("system:property:read", [".*:.*:.*"])).toBe(true);
    })

    test("User with multiple roles", () => {
        expect(userHasMultiRoles(["system:property:read", "system:property:update"], [".*:.*:.*"])).toBe(true);
    })
})