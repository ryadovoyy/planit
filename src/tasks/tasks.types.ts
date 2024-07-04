import { Prisma, TaskFieldType } from '@prisma/client';

import { AddCustomFieldValueDto } from './dto/add-custom-field-value.dto';

export const taskUserIdSelect = Prisma.validator<Prisma.TaskSelect>()({
  list: {
    select: {
      project: {
        select: { userId: true },
      },
    },
  },
});

export const taskWithCustomFieldsInclude =
  Prisma.validator<Prisma.TaskInclude>()({
    fieldNumericValues: true,
    fieldStringValues: true,
    fieldDropdownValues: true,
  });

export const listWithProjectCustomFieldsSelect =
  Prisma.validator<Prisma.ListSelect>()({
    project: {
      select: {
        taskFields: {
          select: {
            id: true,
            type: true,
          },
        },
      },
    },
  });

export const taskWithProjectCustomFieldsSelect =
  Prisma.validator<Prisma.TaskSelect>()({
    list: { select: listWithProjectCustomFieldsSelect },
  });

export type TaskUserId = Prisma.TaskGetPayload<{
  select: typeof taskUserIdSelect;
}>;

export type TaskWithCustomFields = Prisma.TaskGetPayload<{
  include: typeof taskWithCustomFieldsInclude;
}>;

export type ListWithProjectCustomFields = Prisma.ListGetPayload<{
  select: typeof listWithProjectCustomFieldsSelect;
}>;

export type TaskWithProjectCustomFields = Prisma.TaskGetPayload<{
  select: typeof taskWithProjectCustomFieldsSelect;
}>;

export interface ProjectCustomField {
  id: number;
  type: TaskFieldType;
}

export type CustomFieldQuery = {
  fieldNumericValues?: {
    create?: Prisma.TaskFieldNumericValueCreateWithoutTaskInput[];
    upsert?: Prisma.TaskFieldNumericValueUpsertWithWhereUniqueWithoutTaskInput[];
  };
  fieldStringValues?: {
    create?: Prisma.TaskFieldStringValueCreateWithoutTaskInput[];
    upsert?: Prisma.TaskFieldStringValueUpsertWithWhereUniqueWithoutTaskInput[];
  };
  fieldDropdownValues?: {
    create?: Prisma.TaskFieldDropdownValueCreateWithoutTaskInput[];
    upsert?: Prisma.TaskFieldDropdownValueUpsertWithWhereUniqueWithoutTaskInput[];
  };
};

export interface FieldStrategy {
  addQuery(
    fieldData: AddCustomFieldValueDto,
    fieldQuery: CustomFieldQuery,
    taskId?: number,
  ): void;
}
