import { PickType } from '@nestjs/swagger';

import { ProjectDto } from './project.dto';

export class ProjectTitleDto extends PickType(ProjectDto, [
  'id',
  'title',
] as const) {}
