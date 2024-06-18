import { Prisma } from '@prisma/client';

import { UserWithRolesDto } from './dto/user-with-roles.dto';

export const userWithRolesInclude: Prisma.UserInclude = {
  roles: true,
};

const userWithRoles = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: userWithRolesInclude,
});

export type UserWithRoles = Prisma.UserGetPayload<typeof userWithRoles>;
export type UserWithRolesData = UserWithRoles | UserWithRoles[];
export type UserWithRolesDtoData = UserWithRolesDto | UserWithRolesDto[];
