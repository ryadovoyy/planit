import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateDropdownOptionDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty()
  value: string;

  @IsInt()
  @ApiProperty()
  taskFieldId: number;
}
