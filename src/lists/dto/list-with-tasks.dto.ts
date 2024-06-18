import { ApiProperty } from '@nestjs/swagger';

import { TaskDto } from 'src/tasks/dto/task.dto';
import { ListDto } from './list.dto';

export class ListWithTasksDto extends ListDto {
  @ApiProperty({ type: TaskDto, isArray: true })
  tasks: TaskDto[];
}
