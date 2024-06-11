import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserWithRoles } from './users.types';

const HASHING_ROUNDS = 12;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserWithRoles> {
    const user = await this.prisma.user.findFirst({
      where: { email: createUserDto.email },
    });

    if (user) {
      throw new BadRequestException(
        `User already exists with email: ${createUserDto.email}`,
      );
    }

    const hashedPassword = await this.hashPassword(createUserDto.password);
    createUserDto.password = hashedPassword;

    if (!createUserDto.name) {
      createUserDto.name = createUserDto.email.split('@')[0];
    }

    return this.prisma.user.create({
      data: {
        ...createUserDto,
        roles: {
          connect: { name: 'USER' },
        },
      },
      include: { roles: true },
    });
  }

  async findAll(): Promise<UserWithRoles[]> {
    return this.prisma.user.findMany({
      include: { roles: true },
    });
  }

  async findOneById(id: number): Promise<UserWithRoles | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: { roles: true },
    });
  }

  async findOneByIdOrFail(id: number): Promise<UserWithRoles> {
    const user = await this.findOneById(id);

    if (!user) {
      throw new NotFoundException(`No user found with id: ${id}`);
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<UserWithRoles | null> {
    return this.prisma.user.findUnique({
      where: { email },
      include: { roles: true },
    });
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserWithRoles> {
    if (updateUserDto.password) {
      const hashedPassword = await this.hashPassword(updateUserDto.password);
      updateUserDto.password = hashedPassword;
    }

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      include: { roles: true },
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, HASHING_ROUNDS);
  }
}
