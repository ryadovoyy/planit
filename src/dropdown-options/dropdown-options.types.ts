import { Prisma } from '@prisma/client';

export const dropdownOptionUserIdSelect =
  Prisma.validator<Prisma.TaskFieldDropdownOptionSelect>()({
    taskField: {
      select: {
        project: {
          select: { userId: true },
        },
      },
    },
  });

export type DropdownOptionUserId = Prisma.TaskFieldDropdownOptionGetPayload<{
  select: typeof dropdownOptionUserIdSelect;
}>;
