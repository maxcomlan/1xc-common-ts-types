declare type UserProfileScope = "user:profile:read" | "user:profile:activate" | "user:profile:block" | "user:profile:.*";
declare type UserBusinessScope = "user:business:read" | "user:business:allow" | "user:business:block" | "user:business:delete" | "user:business:.*";
declare type TicketScope = "ticket:details:read" | "ticket:status:approve" | "ticket:status:abort" | "ticket:transaction:read" | "ticket:status:.*" | "ticket:transaction:.*" | "ticket:.*:.*";
declare type WalletScope = "wallet:details:read" | "wallet:balance:credit" | "wallet:balance:debit" | "wallet:transfer:read" | "wallet:history:read" | "wallet:balance:.*" | "wallet:.*:.*";
declare type InvestmentNetworkScope = "investment:network:read" | "investment:network:.*";
declare type SystemMethodScope = "system:method:read" | "system:method:create" | "system:method:update" | "system:method:delete" | "system:method:.*";
declare type SystemMethodAccountScope = "system:methodaccount:read" | "system:methodaccount:create" | "system:methodaccount:update" | "system:methodaccount:delete" | "system:methodaccount:.*";
declare type SystemPropertyScope = "system:property:read" | "system:property:update" | "system:property:.*";
declare type SystemAdminScope = "system:admin:read" | "system:admin:create" | "system:admin:disable" | "system:admin:enable" | "system:admin:.*";
declare type AdminRoleScope = "admin:role:read" | "admin:role:update" | "admin:role:*";
declare type SystemEventScope = "system:event:read";
declare type SystemLogScope = "system:log:read";
export declare type UserScope = UserProfileScope | UserBusinessScope | "user:.*:.*";
export declare type SystemScope = SystemMethodScope | SystemMethodAccountScope | SystemAdminScope | SystemPropertyScope | SystemEventScope | SystemLogScope | "system:.*:.*";
export declare type ScopedRole = UserScope | TicketScope | WalletScope | InvestmentNetworkScope | AdminRoleScope | SystemScope | ".*:.*:.*";
export declare const ScopedRoleList: ScopedRole[];
export interface UserRole {
    id: string;
    roles: ScopedRole[];
}
export declare function userHasRole(needle: ScopedRole, haystack: ScopedRole[]): boolean;
export declare function userHasMultiRoles(needles: ScopedRole[], haystack: ScopedRole[]): boolean;
export {};
