import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { CaslModule } from './casl/casl.module';
import { ListsModule } from './lists/lists.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectsModule } from './projects/projects.module';
import { RolesModule } from './roles/roles.module';
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
  ],
})
export class AppModule {}
