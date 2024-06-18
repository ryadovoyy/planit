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
import { RoleDto } from './dto/role.dto';
import { RoleEnum } from './role.enum';
import { RolesService } from './roles.service';

@Controller('roles')
@ApiTags('roles')
@ApiBearerAuth()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @Roles(RoleEnum.Admin)
  @ApiOperation({ summary: 'Create a new role' })
  @ApiCreatedResponse({ type: RoleDto })
  async create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @Roles(RoleEnum.Admin)
  @ApiOperation({ summary: 'Get all roles' })
  @ApiOkResponse({ type: RoleDto, isArray: true })
  async findAll(): Promise<Role[]> {
    return this.rolesService.findAll();
  }
}
