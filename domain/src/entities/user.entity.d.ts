declare const Role: {
    readonly ADMIN: "ADMIN";
    readonly USER: "USER";
};
export type Role = (typeof Role)[keyof typeof Role];
export interface User {
    id: string;
    name: string | null;
    email: string;
    password: string;
    Role: Role;
    createdAt?: Date;
    updatedAt?: Date;
}
export {};
//# sourceMappingURL=user.entity.d.ts.map