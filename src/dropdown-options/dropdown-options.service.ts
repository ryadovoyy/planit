import { BadRequestException, Injectable } from '@nestjs/common';
import { TaskFieldDropdownOption, TaskFieldType } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';
import {
  DropdownOptionUserId,
  dropdownOptionUserIdSelect,
} from './dropdown-options.types';
import { CreateDropdownOptionDto } from './dto/create-dropdown-option.dto';
import { UpdateDropdownOptionDto } from './dto/update-dropdown-option.dto';

@Injectable()
export class DropdownOptionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDropdownOptionDto: CreateDropdownOptionDto) {
    const { value, taskFieldId } = createDropdownOptionDto;

    const taskField = await this.prisma.taskField.findUnique({
      where: { id: taskFieldId },
    });

    if (taskField?.type !== TaskFieldType.DROPDOWN) {
      throw new BadRequestException(
        `Can't create a dropdown option in a non-dropdown task field`,
      );
    }

    const option = await this.prisma.taskFieldDropdownOption.findUnique({
      where: {
        taskFieldId_value: { taskFieldId, value },
      },
    });

    if (option) {
      throw new BadRequestException(
        `A dropdown option with value '${value}' already exists`,
      );
    }

    return this.prisma.taskFieldDropdownOption.create({
      data: { value, taskFieldId },
    });
  }

  async findOneWithUserId(id: number): Promise<DropdownOptionUserId | null> {
    return this.prisma.taskFieldDropdownOption.findUnique({
      where: { id },
      select: dropdownOptionUserIdSelect,
    });
  }

  async update(
    id: number,
    updateDropdownOptionDto: UpdateDropdownOptionDto,
  ): Promise<TaskFieldDropdownOption> {
    return this.prisma.taskFieldDropdownOption.update({
      where: { id },
      data: updateDropdownOptionDto,
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.taskFieldDropdownOption.delete({
      where: { id },
    });
  }
}
