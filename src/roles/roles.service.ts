import { BadRequestException, Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = await this.prisma.role.findFirst({
      where: { name: createRoleDto.name },
    });

    if (role) {
      throw new BadRequestException(
        `Role already exists with name: ${createRoleDto.name}`,
      );
    }

    return this.prisma.role.create({ data: createRoleDto });
  }

  async findAll(): Promise<Role[]> {
    return this.prisma.role.findMany();
  }
}
