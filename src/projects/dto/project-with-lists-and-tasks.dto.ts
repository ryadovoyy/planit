import { ApiProperty } from '@nestjs/swagger';

import { ListWithTasksDto } from 'src/lists/dto/list-with-tasks.dto';
import { ProjectDto } from './project.dto';

export class ProjectWithListsAndTasksDto extends ProjectDto {
  @ApiProperty({ type: ListWithTasksDto, isArray: true })
  lists: ListWithTasksDto[];
}
