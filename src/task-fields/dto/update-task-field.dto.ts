import { PartialType, PickType } from '@nestjs/swagger';

import { CreateTaskFieldDto } from './create-task-field.dto';

export class UpdateTaskFieldDto extends PartialType(
  PickType(CreateTaskFieldDto, ['title'] as const),
) {}
