import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { Public } from 'src/auth/public.decorator';
import { Roles } from 'src/auth/roles.decorator';
import { CheckOwnershipInParams } from 'src/casl/check-ownership.decorator';
import { RoleEnum } from 'src/roles/role.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserWithRolesDto } from './dto/user-with-roles.dto';
import { UserMappingInterceptor } from './user-mapping.interceptor';
import { UsersService } from './users.service';
import { UserWithRoles } from './users.types';

@Controller('users')
@UseInterceptors(UserMappingInterceptor)
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Public()
  @ApiOperation({ summary: 'Register a new user' })
  @ApiCreatedResponse({ type: UserWithRolesDto })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserWithRoles> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(RoleEnum.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ type: UserWithRolesDto, isArray: true })
  async findAll(): Promise<UserWithRoles[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @CheckOwnershipInParams('User')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find user by ID' })
  @ApiOkResponse({ type: UserWithRolesDto })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserWithRoles> {
    return this.usersService.findOneByIdOrFail(id);
  }

  @Patch(':id')
  @CheckOwnershipInParams('User')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user details' })
  @ApiOkResponse({ type: UserWithRolesDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserWithRoles> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @CheckOwnershipInParams('User')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a user' })
  @ApiNoContentResponse()
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}
