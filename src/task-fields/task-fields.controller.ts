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
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { TaskField } from '@prisma/client';

import {
  CheckOwnershipInBody,
  CheckOwnershipInParams,
  CheckOwnershipInQuery,
} from 'src/casl/check-ownership.decorator';
import { CreateTaskFieldDto } from './dto/create-task-field.dto';
import { TaskFieldWithOptionsDto } from './dto/task-field-with-options.dto';
import { TaskFieldDto } from './dto/task-field.dto';
import { UpdateTaskFieldDto } from './dto/update-task-field.dto';
import { TaskFieldsService } from './task-fields.service';
import { TaskFieldWithOptions } from './task-fields.types';

@Controller('task-fields')
@ApiTags('task-fields')
@ApiBearerAuth()
export class TaskFieldsController {
  constructor(private readonly taskFieldsService: TaskFieldsService) {}

  @Post()
  @CheckOwnershipInBody('Project')
  @ApiOperation({ summary: 'Create a custom task field in a project' })
  @ApiCreatedResponse({ type: TaskFieldWithOptionsDto })
  async create(
    @Body() createTaskFieldDto: CreateTaskFieldDto,
  ): Promise<TaskField | TaskFieldWithOptions> {
    return this.taskFieldsService.create(createTaskFieldDto);
  }

  @Get()
  @CheckOwnershipInQuery('Project')
  @ApiOperation({ summary: 'Find all custom task fields in a project' })
  @ApiOkResponse({ type: TaskFieldWithOptionsDto, isArray: true })
  async findAll(
    @Query('projectId', ParseIntPipe) projectId: number,
  ): Promise<(TaskField | TaskFieldWithOptions)[]> {
    return this.taskFieldsService.findAll(projectId);
  }

  @Patch(':id')
  @CheckOwnershipInParams('TaskField')
  @ApiOperation({ summary: 'Update custom task field details' })
  @ApiOkResponse({ type: TaskFieldDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskFieldDto: UpdateTaskFieldDto,
  ): Promise<TaskField> {
    return this.taskFieldsService.update(id, updateTaskFieldDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @CheckOwnershipInParams('TaskField')
  @ApiOperation({ summary: 'Delete a custom task field' })
  @ApiNoContentResponse()
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.taskFieldsService.remove(id);
  }
}
