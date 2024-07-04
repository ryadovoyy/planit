import { Module, ParseIntPipe } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { DropdownOptionsModule } from 'src/dropdown-options/dropdown-options.module';
import { ListsModule } from 'src/lists/lists.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { TaskFieldsModule } from 'src/task-fields/task-fields.module';
import { TasksModule } from 'src/tasks/tasks.module';
import { UsersModule } from 'src/users/users.module';
import { CaslAbilityFactory } from './casl-ability.factory';
import { OwnershipStrategyFactory } from './ownership-strategy.factory';
import { OwnershipGuard } from './ownership.guard';

@Module({
  imports: [
    UsersModule,
    ProjectsModule,
    ListsModule,
    TasksModule,
    TaskFieldsModule,
    DropdownOptionsModule,
  ],
  providers: [
    CaslAbilityFactory,
    OwnershipStrategyFactory,
    ParseIntPipe,
    { provide: APP_GUARD, useClass: OwnershipGuard },
  ],
})
export class CaslModule {}
