import { Prisma } from '@prisma/client';

import { UserWithRolesDto } from './dto/user-with-roles.dto';

export const userWithRolesInclude = Prisma.validator<Prisma.UserInclude>()({
  roles: true,
});

export type UserWithRoles = Prisma.UserGetPayload<{
  include: typeof userWithRolesInclude;
}>;

export type UserWithRolesData = UserWithRoles | UserWithRoles[];
export type UserWithRolesDtoData = UserWithRolesDto | UserWithRolesDto[];
