import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

import { AddCustomFieldValueDto } from './add-custom-field-value.dto';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  @IsOptional()
  @ApiProperty({ required: false })
  description?: string;

  @IsInt()
  @ApiProperty()
  listId: number;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested()
  @IsOptional()
  @Type(() => AddCustomFieldValueDto)
  @ApiProperty({ type: AddCustomFieldValueDto, isArray: true, required: false })
  customFieldValues?: AddCustomFieldValueDto[];
}
