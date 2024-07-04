import { ApiProperty } from '@nestjs/swagger';
import { TaskFieldType } from '@prisma/client';
import {
  ArrayMaxSize,
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  ValidateIf,
} from 'class-validator';

export class CreateTaskFieldDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty()
  title: string;

  @IsEnum(TaskFieldType)
  @ApiProperty({ enum: TaskFieldType })
  type: TaskFieldType;

  @ValidateIf((o: CreateTaskFieldDto) => o.type === 'DROPDOWN')
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMaxSize(30)
  @ArrayUnique()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @MaxLength(50, { each: true })
  @ApiProperty({ required: false })
  dropdownOptions?: string[];

  @IsInt()
  @ApiProperty()
  projectId: number;
}
