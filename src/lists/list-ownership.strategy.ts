import { Injectable } from '@nestjs/common';

import { OwnershipStrategy } from 'src/casl/casl.types';
import { ListsService } from './lists.service';

@Injectable()
export class ListOwnershipStrategy implements OwnershipStrategy {
  constructor(private readonly listsService: ListsService) {}

  async findSubjectWithUserId(subjectId: number): Promise<any> {
    return this.listsService.findOneWithUserId(subjectId);
  }
}
