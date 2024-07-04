import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { TaskWithCustomFieldsDto } from 'src/tasks/dto/task-with-custom-fields.dto';
import { ListDto } from './list.dto';

export class ListWithTasksDto extends ListDto {
  @Type(() => TaskWithCustomFieldsDto)
  @ApiProperty({ type: TaskWithCustomFieldsDto, isArray: true })
  tasks: TaskWithCustomFieldsDto[];
}
