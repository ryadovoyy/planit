import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Task } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';
import { AddCustomFieldValueDto } from './dto/add-custom-field-value.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { MoveTaskDto } from './dto/move-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FieldStrategyFactory } from './field-strategies/field-strategy.factory';
import {
  CustomFieldQuery,
  ListWithProjectCustomFields,
  ProjectCustomField,
  TaskUserId,
  TaskWithCustomFields,
  TaskWithProjectCustomFields,
  listWithProjectCustomFieldsSelect,
  taskUserIdSelect,
  taskWithCustomFieldsInclude,
  taskWithProjectCustomFieldsSelect,
} from './tasks.types';

@Injectable()
export class TasksService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fieldStrategyFactory: FieldStrategyFactory,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<TaskWithCustomFields> {
    const { customFieldValues, ...taskData } = createTaskDto;

    const listWithProjectCustomFields =
      await this.findProjectCustomFieldsByListId(taskData.listId);

    const projectCustomFields = listWithProjectCustomFields!.project.taskFields;

    const customFieldQuery = this.createCustomFieldQuery(
      customFieldValues,
      projectCustomFields,
    );

    return this.prisma.$transaction(
      async (tx) => {
        const taskCount = await tx.task.count({
          where: { listId: taskData.listId },
        });

        return tx.task.create({
          data: {
            ...taskData,
            position: taskCount + 1,
            ...customFieldQuery,
          },
          include: taskWithCustomFieldsInclude,
        });
      },
      {
        isolationLevel: 'Serializable',
      },
    );
  }

  async findOneWithUserId(id: number): Promise<TaskUserId | null> {
    return this.prisma.task.findUnique({
      where: { id },
      select: taskUserIdSelect,
    });
  }

  async update(
    id: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<TaskWithCustomFields> {
    const { customFieldValues, ...taskData } = updateTaskDto;

    const taskWithProjectCustomFields =
      await this.findProjectCustomFieldsByTaskId(id);

    const projectCustomFields =
      taskWithProjectCustomFields!.list.project.taskFields;

    const customFieldQuery = this.createCustomFieldQuery(
      customFieldValues,
      projectCustomFields,
      id,
    );

    return this.prisma.task.update({
      where: { id },
      data: {
        ...taskData,
        ...customFieldQuery,
      },
      include: taskWithCustomFieldsInclude,
    });
  }

  private createCustomFieldQuery(
    customFieldValues: AddCustomFieldValueDto[] | undefined,
    projectCustomFields: ProjectCustomField[],
    taskId?: number,
  ): CustomFieldQuery {
    const projectCustomFieldsMap = new Map(
      projectCustomFields.map((field) => [field.id, field]),
    );

    const customFieldQuery = {} as CustomFieldQuery;

    if (customFieldValues) {
      for (const fieldData of customFieldValues) {
        const { taskFieldId } = fieldData;
        const taskField = projectCustomFieldsMap.get(taskFieldId);

        if (!taskField) {
          throw new NotFoundException(
            `No custom field found with id: ${taskFieldId}`,
          );
        }

        const fieldStrategy = this.fieldStrategyFactory.getStrategy(
          taskField.type,
        );

        fieldStrategy.addQuery(fieldData, customFieldQuery, taskId);
      }
    }

    return customFieldQuery;
  }

  private async findProjectCustomFieldsByListId(
    listId: number,
  ): Promise<ListWithProjectCustomFields | null> {
    return this.prisma.list.findUnique({
      where: { id: listId },
      select: listWithProjectCustomFieldsSelect,
    });
  }

  private async findProjectCustomFieldsByTaskId(
    taskId: number,
  ): Promise<TaskWithProjectCustomFields | null> {
    return this.prisma.task.findUnique({
      where: { id: taskId },
      select: taskWithProjectCustomFieldsSelect,
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.task.delete({
      where: { id },
    });
  }

  async move(id: number, moveTaskDto: MoveTaskDto): Promise<Task> {
    const { newPosition } = moveTaskDto;

    return this.prisma.$transaction(
      async (tx) => {
        const task = await tx.task.findUnique({
          where: { id },
        });

        if (!task) {
          throw new NotFoundException(`No task found with id: ${id}`);
        }

        const oldPosition = task.position;
        const currentListId = task.listId;
        const targetListId = moveTaskDto.targetListId
          ? moveTaskDto.targetListId
          : currentListId;

        if (targetListId === currentListId && newPosition === oldPosition) {
          return task;
        }

        const taskCount = await tx.task.count({
          where: { listId: targetListId },
        });

        if (
          (targetListId === currentListId && newPosition > taskCount) ||
          (targetListId !== currentListId && newPosition > taskCount + 1)
        ) {
          throw new BadRequestException(
            `Can't move a task to a non-existent position`,
          );
        }

        if (targetListId === currentListId) {
          if (oldPosition < newPosition) {
            await tx.task.updateMany({
              where: {
                listId: currentListId,
                position: {
                  gt: oldPosition,
                  lte: newPosition,
                },
              },
              data: {
                position: { decrement: 1 },
              },
            });
          } else {
            await tx.task.updateMany({
              where: {
                listId: currentListId,
                position: {
                  gte: newPosition,
                  lt: oldPosition,
                },
              },
              data: {
                position: { increment: 1 },
              },
            });
          }
        } else {
          await tx.task.updateMany({
            where: {
              listId: currentListId,
              position: { gt: oldPosition },
            },
            data: {
              position: { decrement: 1 },
            },
          });

          if (newPosition <= taskCount) {
            await tx.task.updateMany({
              where: {
                listId: targetListId,
                position: { gte: newPosition },
              },
              data: {
                position: { increment: 1 },
              },
            });
          }
        }

        return tx.task.update({
          where: { id },
          data: {
            position: newPosition,
            listId: targetListId,
          },
        });
      },
      {
        isolationLevel: 'Serializable',
      },
    );
  }
}
