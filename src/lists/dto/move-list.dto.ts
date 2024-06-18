import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class MoveListDto {
  @IsInt()
  @Min(1)
  @ApiProperty()
  newPosition: number;
}
