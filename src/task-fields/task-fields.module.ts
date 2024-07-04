import { Module } from '@nestjs/common';

import { TaskFieldOwnershipStrategy } from './task-field-ownership.strategy';
import { TaskFieldsController } from './task-fields.controller';
import { TaskFieldsService } from './task-fields.service';

@Module({
  controllers: [TaskFieldsController],
  providers: [TaskFieldsService, TaskFieldOwnershipStrategy],
  exports: [TaskFieldOwnershipStrategy],
})
export class TaskFieldsModule {}
