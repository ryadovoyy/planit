import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { CaslModule } from './casl/casl.module';
import { DropdownOptionsModule } from './dropdown-options/dropdown-options.module';
import { ListsModule } from './lists/lists.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectsModule } from './projects/projects.module';
import { RolesModule } from './roles/roles.module';
import { TaskFieldsModule } from './task-fields/task-fields.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    CaslModule,
    UsersModule,
    RolesModule,
    ProjectsModule,
    ListsModule,
    TasksModule,
    TaskFieldsModule,
    DropdownOptionsModule,
  ],
})
export class AppModule {}
