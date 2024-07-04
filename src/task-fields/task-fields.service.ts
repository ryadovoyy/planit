import { BadRequestException, Injectable } from '@nestjs/common';
import { TaskField, TaskFieldType } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskFieldDto } from './dto/create-task-field.dto';
import { UpdateTaskFieldDto } from './dto/update-task-field.dto';
import {
  TaskFieldUserId,
  TaskFieldWithOptions,
  taskFieldUserIdSelect,
  taskFieldWithOptionsInclude,
} from './task-fields.types';

@Injectable()
export class TaskFieldsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createTaskFieldDto: CreateTaskFieldDto,
  ): Promise<TaskField | TaskFieldWithOptions> {
    const { title, type, dropdownOptions, projectId } = createTaskFieldDto;

    const taskField = await this.prisma.taskField.findUnique({
      where: {
        projectId_title_type: { projectId, title, type },
      },
    });

    if (taskField) {
      throw new BadRequestException(
        `A field with title '${title}' and type '${type}' already exists`,
      );
    }

    if (type === TaskFieldType.DROPDOWN && dropdownOptions) {
      return this.prisma.taskField.create({
        data: {
          title,
          type,
          projectId,
          dropdownOptions: {
            create: [...dropdownOptions.map((option) => ({ value: option }))],
          },
        },
        include: taskFieldWithOptionsInclude,
      });
    } else {
      return this.prisma.taskField.create({
        data: {
          title,
          type,
          projectId,
        },
      });
    }
  }

  async findAll(
    projectId: number,
  ): Promise<(TaskField | TaskFieldWithOptions)[]> {
    const taskFields = await this.prisma.taskField.findMany({
      where: { projectId },
      include: taskFieldWithOptionsInclude,
    });

    return taskFields.map((field) => {
      if (field.dropdownOptions.length === 0) {
        Reflect.deleteProperty(field, 'dropdownOptions');
      }
      return field;
    });
  }

  async findOneWithUserId(id: number): Promise<TaskFieldUserId | null> {
    return this.prisma.taskField.findUnique({
      where: { id },
      select: taskFieldUserIdSelect,
    });
  }

  async update(
    id: number,
    updateTaskFieldDto: UpdateTaskFieldDto,
  ): Promise<TaskField> {
    return this.prisma.taskField.update({
      where: { id },
      data: updateTaskFieldDto,
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.taskField.delete({
      where: { id },
    });
  }
}
