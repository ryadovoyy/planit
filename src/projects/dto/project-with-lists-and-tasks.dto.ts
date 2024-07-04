import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { ListWithTasksDto } from 'src/lists/dto/list-with-tasks.dto';
import { ProjectDto } from './project.dto';

export class ProjectWithListsAndTasksDto extends ProjectDto {
  @Type(() => ListWithTasksDto)
  @ApiProperty({ type: ListWithTasksDto, isArray: true })
  lists: ListWithTasksDto[];
}
