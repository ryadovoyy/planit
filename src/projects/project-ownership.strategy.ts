import { Injectable } from '@nestjs/common';

import { OwnershipStrategy } from 'src/casl/casl.types';
import { ProjectsService } from './projects.service';

@Injectable()
export class ProjectOwnershipStrategy implements OwnershipStrategy {
  constructor(private readonly projectsService: ProjectsService) {}

  async findSubjectWithUserId(subjectId: number): Promise<any> {
    return this.projectsService.findOneWithUserId(subjectId);
  }
}
