import {
  Body,
  Controller,
  Delete,
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
import { Task } from '@prisma/client';

import {
  CheckOwnership,
  CheckOwnershipInBody,
  CheckOwnershipInParams,
} from 'src/casl/check-ownership.decorator';
import { CreateTaskDto } from './dto/create-task.dto';
import { MoveTaskDto } from './dto/move-task.dto';
import { TaskWithCustomFieldsDto } from './dto/task-with-custom-fields.dto';
import { TaskDto } from './dto/task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskMappingInterceptor } from './task-mapping.interceptor';
import { TasksService } from './tasks.service';
import { TaskWithCustomFields } from './tasks.types';

@Controller('tasks')
@ApiTags('tasks')
@ApiBearerAuth()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @CheckOwnershipInBody('List')
  @UseInterceptors(TaskMappingInterceptor)
  @ApiOperation({ summary: 'Create a new task in a list' })
  @ApiCreatedResponse({ type: TaskWithCustomFieldsDto })
  async create(
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<TaskWithCustomFields> {
    return this.tasksService.create(createTaskDto);
  }

  @Patch(':id')
  @CheckOwnershipInParams('Task')
  @UseInterceptors(TaskMappingInterceptor)
  @ApiOperation({ summary: 'Update task details' })
  @ApiOkResponse({ type: TaskWithCustomFieldsDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskWithCustomFields> {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @CheckOwnershipInParams('Task')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete a task' })
  @ApiNoContentResponse()
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.remove(id);
  }

  @Patch(':id/move')
  @CheckOwnership(
    { subject: 'Task', store: 'params', id: 'id' },
    { subject: 'List', store: 'body', id: 'targetListId', isOptional: true },
  )
  @ApiOperation({ summary: 'Move a task to another position' })
  @ApiOkResponse({ type: TaskDto })
  async move(
    @Param('id', ParseIntPipe) id: number,
    @Body() moveTaskDto: MoveTaskDto,
  ): Promise<Task> {
    return this.tasksService.move(id, moveTaskDto);
  }
}
