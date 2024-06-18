import { Injectable } from '@nestjs/common';

import { OwnershipStrategy } from 'src/casl/casl.types';

@Injectable()
export class UserOwnershipStrategy implements OwnershipStrategy {
  async findSubjectWithUserId(subjectId: number): Promise<any> {
    return { id: subjectId };
  }
}
