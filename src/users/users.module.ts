import { Module } from '@nestjs/common';

import { UserOwnershipStrategy } from './user-ownership.strategy';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserOwnershipStrategy],
  exports: [UsersService, UserOwnershipStrategy],
})
export class UsersModule {}
