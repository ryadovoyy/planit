import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { DropdownOptionOwnershipStrategy } from 'src/dropdown-options/dropdown-option-ownership.strategy';
import { ListOwnershipStrategy } from 'src/lists/list-ownership.strategy';
import { ProjectOwnershipStrategy } from 'src/projects/project-ownership.strategy';
import { TaskFieldOwnershipStrategy } from 'src/task-fields/task-field-ownership.strategy';
import { TaskOwnershipStrategy } from 'src/tasks/task-ownership.strategy';
import { UserOwnershipStrategy } from 'src/users/user-ownership.strategy';
import { AppSubject, OwnershipStrategy } from './casl.types';

@Injectable()
export class OwnershipStrategyFactory {
  private readonly strategies: Map<AppSubject, OwnershipStrategy>;

  constructor(
    userOwnershipStrategy: UserOwnershipStrategy,
    projectOwnershipStrategy: ProjectOwnershipStrategy,
    listOwnershipStrategy: ListOwnershipStrategy,
    taskOwnershipStrategy: TaskOwnershipStrategy,
    taskFieldOwnershipStrategy: TaskFieldOwnershipStrategy,
    dropdownOptionOwnershipStrategy: DropdownOptionOwnershipStrategy,
  ) {
    this.strategies = new Map<AppSubject, OwnershipStrategy>([
      ['User', userOwnershipStrategy],
      ['Project', projectOwnershipStrategy],
      ['List', listOwnershipStrategy],
      ['Task', taskOwnershipStrategy],
      ['TaskField', taskFieldOwnershipStrategy],
      ['TaskFieldDropdownOption', dropdownOptionOwnershipStrategy],
    ]);
  }

  getStrategy(subject: AppSubject): OwnershipStrategy {
    const strategy = this.strategies.get(subject);
    if (!strategy) {
      throw new InternalServerErrorException();
    }
    return strategy;
  }
}
