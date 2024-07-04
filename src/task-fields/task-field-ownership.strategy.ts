import { Injectable } from '@nestjs/common';

import { OwnershipStrategy } from 'src/casl/casl.types';
import { TaskFieldsService } from './task-fields.service';

@Injectable()
export class TaskFieldOwnershipStrategy implements OwnershipStrategy {
  constructor(private readonly taskFieldsService: TaskFieldsService) {}

  async findSubjectWithUserId(subjectId: number): Promise<any> {
    return this.taskFieldsService.findOneWithUserId(subjectId);
  }
}
