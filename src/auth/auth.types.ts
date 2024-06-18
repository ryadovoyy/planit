import { Request } from 'express';

type Roles = { roles: string[] };

export type JwtPayload = { sub: number } & Roles;
export type UserInfo = { id: number } & Roles;

export interface RequestWithUser extends Request {
  user: UserInfo;
}
