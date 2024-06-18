import { Prisma } from '@prisma/client';

export const projectTitleSelect: Prisma.ProjectSelect = {
  id: true,
  title: true,
};

export const projectUserIdSelect: Prisma.ProjectSelect = {
  userId: true,
};

export const projectWithListsAndTasksInclude: Prisma.ProjectInclude = {
  lists: {
    orderBy: { position: 'asc' },
    include: {
      tasks: {
        orderBy: { position: 'asc' },
      },
    },
  },
};

const projectTitle = Prisma.validator<Prisma.ProjectDefaultArgs>()({
  select: projectTitleSelect,
});

const projectUserId = Prisma.validator<Prisma.ProjectDefaultArgs>()({
  select: projectUserIdSelect,
});

const projectWithListsAndTasks = Prisma.validator<Prisma.ProjectDefaultArgs>()({
  include: projectWithListsAndTasksInclude,
});

export type ProjectTitle = Prisma.ProjectGetPayload<typeof projectTitle>;
export type ProjectUserId = Prisma.ProjectGetPayload<typeof projectUserId>;
export type ProjectWithListsAndTasks = Prisma.ProjectGetPayload<
  typeof projectWithListsAndTasks
>;
