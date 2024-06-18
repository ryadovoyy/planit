import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Task } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { MoveTaskDto } from './dto/move-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskUserId, taskUserIdSelect } from './tasks.types';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.prisma.$transaction(
      async (tx) => {
        const taskCount = await tx.task.count({
          where: { listId: createTaskDto.listId },
        });

        return tx.task.create({
          data: {
            ...createTaskDto,
            position: taskCount + 1,
          },
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

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
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
