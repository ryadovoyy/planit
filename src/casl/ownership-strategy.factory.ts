import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { ListOwnershipStrategy } from 'src/lists/list-ownership.strategy';
import { ProjectOwnershipStrategy } from 'src/projects/project-ownership.strategy';
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
  ) {
    this.strategies = new Map<AppSubject, OwnershipStrategy>([
      ['User', userOwnershipStrategy],
      ['Project', projectOwnershipStrategy],
      ['List', listOwnershipStrategy],
      ['Task', taskOwnershipStrategy],
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
