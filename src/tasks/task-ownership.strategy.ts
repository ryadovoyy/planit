import { Injectable } from '@nestjs/common';

import { OwnershipStrategy } from 'src/casl/casl.types';
import { TasksService } from './tasks.service';

@Injectable()
export class TaskOwnershipStrategy implements OwnershipStrategy {
  constructor(private readonly tasksService: TasksService) {}

  async findSubjectWithUserId(subjectId: number): Promise<any> {
    return this.tasksService.findOneWithUserId(subjectId);
  }
}
