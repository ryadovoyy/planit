import { ApiProperty } from '@nestjs/swagger';

export class ListDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  position: number;

  @ApiProperty()
  projectId: number;
}
