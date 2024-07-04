import { Prisma } from '@prisma/client';

export const taskFieldWithOptionsInclude =
  Prisma.validator<Prisma.TaskFieldInclude>()({
    dropdownOptions: true,
  });

export const taskFieldUserIdSelect = Prisma.validator<Prisma.TaskFieldSelect>()(
  {
    project: {
      select: { userId: true },
    },
  },
);

export type TaskFieldWithOptions = Prisma.TaskFieldGetPayload<{
  include: typeof taskFieldWithOptionsInclude;
}>;

export type TaskFieldUserId = Prisma.TaskFieldGetPayload<{
  select: typeof taskFieldUserIdSelect;
}>;
