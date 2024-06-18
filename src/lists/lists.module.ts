import { Module } from '@nestjs/common';

import { ListOwnershipStrategy } from './list-ownership.strategy';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';

@Module({
  controllers: [ListsController],
  providers: [ListsService, ListOwnershipStrategy],
  exports: [ListOwnershipStrategy],
})
export class ListsModule {}
