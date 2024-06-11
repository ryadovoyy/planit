import { Prisma } from '@prisma/client';

import { UserEntity } from './entities/user.entity';

const userWithRoles = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: { roles: true },
});

export type UserWithRoles = Prisma.UserGetPayload<typeof userWithRoles>;
export type UserWithRolesData = UserWithRoles | UserWithRoles[];
export type UserEntityData = UserEntity | UserEntity[];
