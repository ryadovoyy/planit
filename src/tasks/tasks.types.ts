import { Prisma } from '@prisma/client';

export const taskUserIdSelect: Prisma.TaskSelect = {
  list: {
    select: {
      project: {
        select: { userId: true },
      },
    },
  },
};

const taskUserId = Prisma.validator<Prisma.TaskDefaultArgs>()({
  select: taskUserIdSelect,
});

export type TaskUserId = Prisma.TaskGetPayload<typeof taskUserId>;
