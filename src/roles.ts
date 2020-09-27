
type UserProfileScope = "user:profile:read"
                        |"user:profile:activate"
                        |"user:profile:block"
                        |"user:profile:.*" // all profile roles

type UserBusinessScope = "user:business:read"
                        |"user:business:allow"
                        |"user:business:block"
                        |"user:business:delete"
                        |"user:business:.*" // all business roles

type TicketScope =  "ticket:details:read"
                    |"ticket:status:approve"
                    |"ticket:status:abort"
                    |"ticket:transaction:read"
                    |"ticket:status:.*"
                    |"ticket:transaction:.*" // all tickets's transaction roles
                    |"ticket:.*:.*"; // all ticket sections roles

type WalletScope = "wallet:details:read"
                    |"wallet:balance:credit"
                    |"wallet:balance:debit"
                    |"wallet:transfer:read"
                    |"wallet:history:read" // all wallet history roles
                    |"wallet:balance:.*"
                    |"wallet:.*:.*" // all wallet sections roles

type InvestmentNetworkScope = "investment:network:read" 
                                |"investment:network:.*" // all investment network roles ;

type SystemMethodScope = "system:method:read"
                    |"system:method:create"
                    |"system:method:update"
                    |"system:method:delete"
                    |"system:method:.*"

type SystemMethodAccountScope = "system:methodaccount:read"
                                |"system:methodaccount:create"
                                |"system:methodaccount:update"
                                |"system:methodaccount:delete"
                                |"system:methodaccount:.*";

type SystemPropertyScope = "system:property:read"
                            |"system:property:update"
                            |"system:property:.*"

type SystemAdminScope = "system:admin:read"
                        |"system:admin:create"
                        |"system:admin:disable"
                        |"system:admin:enable"
                        |"system:admin:.*";

type AdminRoleScope = "admin:role:read"
                    |"admin:role:update"
                    |"admin:role:.*";

type SystemEventScope = "system:event:read";

type SystemLogScope = "system:log:read";

export type UserScope = UserProfileScope | UserBusinessScope | "user:.*:.*";

export type SystemScope = SystemMethodScope | SystemMethodAccountScope | SystemAdminScope | SystemPropertyScope | SystemEventScope | SystemLogScope | "system:.*:.*";
export type ScopedRole = UserScope | TicketScope | WalletScope | InvestmentNetworkScope | AdminRoleScope | SystemScope | ".*:.*:.*";


export const ScopedRoleList: ScopedRole[] = [
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
    "ticket:transaction:.*", // all tickets's transaction roles
    "ticket:.*:.*",

    "wallet:details:read",
    "wallet:balance:credit",
    "wallet:balance:debit",
    "wallet:transfer:read",
    "wallet:history:read", // all wallet history roles
    "wallet:balance:.*",
    "wallet:.*:.*",

    "investment:network:read" ,
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
    "admin:role:.*",

    "system:event:read",
    "system:log:read",

    "user:.*:.*",

    "system:.*:.*",

    ".*:.*:.*"
];

export interface UserRole{
    id: string;
    roles: ScopedRole[];
}

export function userHasRole(needle: ScopedRole, haystack: ScopedRole[]){
    for(let i = 0; i<haystack.length;i++){
        let reg = new RegExp(`^${haystack[i]}$`);
        if(reg.test(needle)){
            return true;
        }
    }
    return false;
}

export function userHasMultiRoles(needles: ScopedRole[], haystack: ScopedRole[]){
    for(let i=0;i<needles.length;i++){
        if(!userHasRole(needles[i], haystack)){
            return false;
        }
    }
    return true;
}