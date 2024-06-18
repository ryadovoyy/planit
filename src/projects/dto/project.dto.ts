import { ApiProperty } from '@nestjs/swagger';

export class ProjectDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ type: String, nullable: true })
  description: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  userId: number;
}
