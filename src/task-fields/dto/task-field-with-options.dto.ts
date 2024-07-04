import { ApiProperty } from '@nestjs/swagger';

import { DropdownOptionDto } from 'src/dropdown-options/dto/dropdown-option.dto';
import { TaskFieldDto } from './task-field.dto';

export class TaskFieldWithOptionsDto extends TaskFieldDto {
  @ApiProperty({ type: DropdownOptionDto, isArray: true, required: false })
  dropdownOptions?: DropdownOptionDto[];
}
