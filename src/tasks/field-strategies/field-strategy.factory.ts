import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { TaskFieldType } from '@prisma/client';

import { FieldStrategy } from '../tasks.types';
import { DropdownFieldStrategy } from './dropdown-field.strategy';
import { NumericFieldStrategy } from './numeric-field.strategy';
import { StringFieldStrategy } from './string-field.strategy';

@Injectable()
export class FieldStrategyFactory {
  private readonly strategies: Map<TaskFieldType, FieldStrategy>;

  constructor(
    numericFieldStrategy: NumericFieldStrategy,
    stringFieldStrategy: StringFieldStrategy,
    dropdownFieldStrategy: DropdownFieldStrategy,
  ) {
    this.strategies = new Map<TaskFieldType, FieldStrategy>([
      [TaskFieldType.NUMERIC, numericFieldStrategy],
      [TaskFieldType.STRING, stringFieldStrategy],
      [TaskFieldType.DROPDOWN, dropdownFieldStrategy],
    ]);
  }

  getStrategy(fieldType: TaskFieldType): FieldStrategy {
    const strategy = this.strategies.get(fieldType);
    if (!strategy) {
      throw new InternalServerErrorException();
    }
    return strategy;
  }
}
