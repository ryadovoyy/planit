import { Prisma } from '@prisma/client';

export const projectTitleSelect = Prisma.validator<Prisma.ProjectSelect>()({
  id: true,
  title: true,
});

export const projectUserIdSelect = Prisma.validator<Prisma.ProjectSelect>()({
  userId: true,
});

export const projectWithListsAndTasksInclude =
  Prisma.validator<Prisma.ProjectInclude>()({
    lists: {
      orderBy: { position: 'asc' },
      include: {
        tasks: {
          orderBy: { position: 'asc' },
          include: {
            fieldNumericValues: true,
            fieldStringValues: true,
            fieldDropdownValues: true,
          },
        },
      },
    },
  });

export type ProjectTitle = Prisma.ProjectGetPayload<{
  select: typeof projectTitleSelect;
}>;

export type ProjectUserId = Prisma.ProjectGetPayload<{
  select: typeof projectUserIdSelect;
}>;

export type ProjectWithListsAndTasks = Prisma.ProjectGetPayload<{
  include: typeof projectWithListsAndTasksInclude;
}>;
