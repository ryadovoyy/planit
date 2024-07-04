import { ApiProperty } from '@nestjs/swagger';

export class DropdownOptionDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  value: string;

  @ApiProperty()
  taskFieldId: number;
}
