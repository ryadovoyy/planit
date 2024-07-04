import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
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
import { TaskDto } from './dto/task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
@ApiTags('tasks')
@ApiBearerAuth()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @CheckOwnershipInBody('List')
  @ApiOperation({ summary: 'Create a new task in a list' })
  @ApiCreatedResponse({ type: TaskDto })
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  @Patch(':id')
  @CheckOwnershipInParams('Task')
  @ApiOperation({ summary: 'Update task details' })
  @ApiOkResponse({ type: TaskDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
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
