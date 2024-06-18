import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, Min } from 'class-validator';

export class MoveTaskDto {
  @IsInt()
  @Min(1)
  @ApiProperty()
  newPosition: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  targetListId?: number;
}
