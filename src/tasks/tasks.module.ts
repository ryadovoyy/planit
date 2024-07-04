import { Module } from '@nestjs/common';

import { DropdownFieldStrategy } from './field-strategies/dropdown-field.strategy';
import { FieldStrategyFactory } from './field-strategies/field-strategy.factory';
import { NumericFieldStrategy } from './field-strategies/numeric-field.strategy';
import { StringFieldStrategy } from './field-strategies/string-field.strategy';
import { TaskOwnershipStrategy } from './task-ownership.strategy';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: [
    TasksService,
    TaskOwnershipStrategy,
    NumericFieldStrategy,
    StringFieldStrategy,
    DropdownFieldStrategy,
    FieldStrategyFactory,
  ],
  exports: [TaskOwnershipStrategy],
})
export class TasksModule {}
