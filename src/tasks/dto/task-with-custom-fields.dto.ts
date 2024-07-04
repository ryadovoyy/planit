import { ApiProperty } from '@nestjs/swagger';
import {
  TaskFieldDropdownValue,
  TaskFieldNumericValue,
  TaskFieldStringValue,
} from '@prisma/client';
import { Exclude } from 'class-transformer';

import { CustomFieldValueDto } from './custom-field-value.dto';
import { TaskDto } from './task.dto';

export class TaskWithCustomFieldsDto extends TaskDto {
  @ApiProperty({ type: CustomFieldValueDto, isArray: true })
  customFieldValues: CustomFieldValueDto[];

  @Exclude({ toPlainOnly: true })
  fieldNumericValues: TaskFieldNumericValue[];

  @Exclude({ toPlainOnly: true })
  fieldStringValues: TaskFieldStringValue[];

  @Exclude({ toPlainOnly: true })
  fieldDropdownValues: TaskFieldDropdownValue[];
}
