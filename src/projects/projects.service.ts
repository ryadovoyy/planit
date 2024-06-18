import { Injectable, NotFoundException } from '@nestjs/common';
import { Project } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import {
  ProjectTitle,
  ProjectUserId,
  ProjectWithListsAndTasks,
  projectTitleSelect,
  projectUserIdSelect,
  projectWithListsAndTasksInclude,
} from './projects.types';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    userId: number,
    createProjectDto: CreateProjectDto,
  ): Promise<ProjectWithListsAndTasks> {
    return this.prisma.project.create({
      data: {
        ...createProjectDto,
        userId,
        lists: {
          create: [
            { title: 'To Do', position: 1 },
            { title: 'In Progress', position: 2 },
            { title: 'Done', position: 3 },
          ],
        },
      },
      include: projectWithListsAndTasksInclude,
    });
  }

  async findAll(userId: number): Promise<ProjectTitle[]> {
    return this.prisma.project.findMany({
      where: { userId },
      select: projectTitleSelect,
    });
  }

  async findOneWithListsAndTasks(
    id: number,
  ): Promise<ProjectWithListsAndTasks> {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: projectWithListsAndTasksInclude,
    });

    if (!project) {
      throw new NotFoundException(`No project found with id: ${id}`);
    }

    return project;
  }

  async findOneWithUserId(id: number): Promise<ProjectUserId | null> {
    return this.prisma.project.findUnique({
      where: { id },
      select: projectUserIdSelect,
    });
  }

  async update(
    id: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    return this.prisma.project.update({
      where: { id },
      data: updateProjectDto,
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.project.delete({
      where: { id },
    });
  }
}
