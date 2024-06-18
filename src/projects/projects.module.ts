import { Module } from '@nestjs/common';

import { ProjectOwnershipStrategy } from './project-ownership.strategy';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, ProjectOwnershipStrategy],
  exports: [ProjectOwnershipStrategy],
})
export class ProjectsModule {}
