import { Prisma } from '@prisma/client';

export const listUserIdSelect: Prisma.ListSelect = {
  project: {
    select: { userId: true },
  },
};

const listUserId = Prisma.validator<Prisma.ListDefaultArgs>()({
  select: listUserIdSelect,
});

export type ListUserId = Prisma.ListGetPayload<typeof listUserId>;
