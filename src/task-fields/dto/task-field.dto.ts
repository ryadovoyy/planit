import { ApiProperty } from '@nestjs/swagger';
import { TaskFieldType } from '@prisma/client';

export class TaskFieldDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ enum: TaskFieldType })
  type: TaskFieldType;

  @ApiProperty()
  projectId: number;
}
