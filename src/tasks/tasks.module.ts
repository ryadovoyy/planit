import { Module } from '@nestjs/common';

import { TaskOwnershipStrategy } from './task-ownership.strategy';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService, TaskOwnershipStrategy],
  exports: [TaskOwnershipStrategy],
})
export class TasksModule {}
