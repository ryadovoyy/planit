import { ApiProperty } from '@nestjs/swagger';

export class TaskDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ type: String, nullable: true })
  description: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  position: number;

  @ApiProperty()
  listId: number;
}
