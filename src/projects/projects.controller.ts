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
  Req,
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
import { Project } from '@prisma/client';

import { RequestWithUser } from 'src/auth/auth.types';
import { CheckOwnershipInParams } from 'src/casl/check-ownership.decorator';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectTitleDto } from './dto/project-title.dto';
import { ProjectWithListsAndTasksDto } from './dto/project-with-lists-and-tasks.dto';
import { ProjectDto } from './dto/project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectMappingInterceptor } from './project-mapping.interceptor';
import { ProjectsService } from './projects.service';
import { ProjectTitle, ProjectWithListsAndTasks } from './projects.types';

@Controller('projects')
@ApiTags('projects')
@ApiBearerAuth()
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @UseInterceptors(ProjectMappingInterceptor)
  @ApiOperation({ summary: 'Create a new project' })
  @ApiCreatedResponse({ type: ProjectWithListsAndTasksDto })
  async create(
    @Req() req: RequestWithUser,
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<ProjectWithListsAndTasks> {
    return this.projectsService.create(req.user.id, createProjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all user projects' })
  @ApiOkResponse({ type: ProjectTitleDto, isArray: true })
  async findAll(@Req() req: RequestWithUser): Promise<ProjectTitle[]> {
    return this.projectsService.findAll(req.user.id);
  }

  @Get(':id')
  @CheckOwnershipInParams('Project')
  @UseInterceptors(ProjectMappingInterceptor)
  @ApiOperation({ summary: 'Find project by ID' })
  @ApiOkResponse({ type: ProjectWithListsAndTasksDto })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProjectWithListsAndTasks> {
    return this.projectsService.findOneWithListsAndTasks(id);
  }

  @Patch(':id')
  @CheckOwnershipInParams('Project')
  @ApiOperation({ summary: 'Update project details' })
  @ApiOkResponse({ type: ProjectDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @CheckOwnershipInParams('Project')
  @ApiOperation({ summary: 'Delete a project' })
  @ApiNoContentResponse()
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.projectsService.remove(id);
  }
}
