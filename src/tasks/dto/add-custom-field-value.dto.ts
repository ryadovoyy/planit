import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class AddCustomFieldValueDto {
  @IsInt()
  @ApiProperty()
  taskFieldId: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @IsOptional()
  @ApiProperty({ required: false })
  value?: string;

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  dropdownOptionId?: number;
}
