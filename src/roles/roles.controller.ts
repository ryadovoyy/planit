import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from '@prisma/client';

import { Roles } from 'src/auth/roles.decorator';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleEntity } from './entities/role.entity';
import { RolesService } from './roles.service';

@Controller('roles')
@ApiTags('roles')
@ApiBearerAuth()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Create new role' })
  @ApiCreatedResponse({ type: RoleEntity })
  async create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Get all roles' })
  @ApiOkResponse({ type: RoleEntity, isArray: true })
  async findAll(): Promise<Role[]> {
    return this.rolesService.findAll();
  }
}
