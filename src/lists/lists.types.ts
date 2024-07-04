import { Prisma } from '@prisma/client';

export const listUserIdSelect = Prisma.validator<Prisma.ListSelect>()({
  project: {
    select: { userId: true },
  },
});

export type ListUserId = Prisma.ListGetPayload<{
  select: typeof listUserIdSelect;
}>;
