type Roles = { roles: string[] };

export type JwtPayload = { sub: number } & Roles;
export type UserInfo = { id: number } & Roles;
