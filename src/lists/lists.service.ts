import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { List } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateListDto } from './dto/create-list.dto';
import { MoveListDto } from './dto/move-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { ListUserId, listUserIdSelect } from './lists.types';

@Injectable()
export class ListsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createListDto: CreateListDto): Promise<List> {
    return this.prisma.$transaction(
      async (tx) => {
        const listCount = await tx.list.count({
          where: { projectId: createListDto.projectId },
        });

        return tx.list.create({
          data: {
            ...createListDto,
            position: listCount + 1,
          },
        });
      },
      {
        isolationLevel: 'Serializable',
      },
    );
  }

  async findOneWithUserId(id: number): Promise<ListUserId | null> {
    return this.prisma.list.findUnique({
      where: { id },
      select: listUserIdSelect,
    });
  }

  async update(id: number, updateListDto: UpdateListDto): Promise<List> {
    return this.prisma.list.update({
      where: { id },
      data: updateListDto,
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.list.delete({
      where: { id },
    });
  }

  async move(id: number, moveListDto: MoveListDto): Promise<List> {
    const { newPosition } = moveListDto;

    return this.prisma.$transaction(
      async (tx) => {
        const list = await tx.list.findUnique({
          where: { id },
        });

        if (!list) {
          throw new NotFoundException(`No list found with id: ${id}`);
        }

        const oldPosition = list.position;
        const projectId = list.projectId;

        if (newPosition === oldPosition) {
          return list;
        }

        const listCount = await tx.list.count({
          where: { projectId },
        });

        if (newPosition > listCount) {
          throw new BadRequestException(
            `Can't move a list to a non-existent position`,
          );
        }

        if (oldPosition < newPosition) {
          await tx.list.updateMany({
            where: {
              projectId,
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
          await tx.list.updateMany({
            where: {
              projectId,
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

        return tx.list.update({
          where: { id },
          data: { position: newPosition },
        });
      },
      {
        isolationLevel: 'Serializable',
      },
    );
  }
}
