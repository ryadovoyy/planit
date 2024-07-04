import { ApiProperty } from '@nestjs/swagger';

export class CustomFieldValueDto {
  @ApiProperty()
  taskFieldId: number;

  @ApiProperty()
  taskId: number;

  @ApiProperty({
    oneOf: [{ type: 'number' }, { type: 'string' }],
    required: false,
  })
  value?: number | string;

  @ApiProperty({ required: false })
  dropdownOptionId?: number;
}
