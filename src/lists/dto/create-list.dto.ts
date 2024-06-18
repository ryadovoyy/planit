import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateListDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty()
  title: string;

  @IsInt()
  @ApiProperty()
  projectId: number;
}
