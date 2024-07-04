import { Injectable } from '@nestjs/common';

import { OwnershipStrategy } from 'src/casl/casl.types';
import { DropdownOptionsService } from './dropdown-options.service';

@Injectable()
export class DropdownOptionOwnershipStrategy implements OwnershipStrategy {
  constructor(
    private readonly dropdownOptionsService: DropdownOptionsService,
  ) {}

  async findSubjectWithUserId(subjectId: number): Promise<any> {
    return this.dropdownOptionsService.findOneWithUserId(subjectId);
  }
}
