import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

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
}
