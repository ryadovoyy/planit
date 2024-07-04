import { Module } from '@nestjs/common';

import { DropdownOptionOwnershipStrategy } from './dropdown-option-ownership.strategy';
import { DropdownOptionsController } from './dropdown-options.controller';
import { DropdownOptionsService } from './dropdown-options.service';

@Module({
  controllers: [DropdownOptionsController],
  providers: [DropdownOptionsService, DropdownOptionOwnershipStrategy],
  exports: [DropdownOptionOwnershipStrategy],
})
export class DropdownOptionsModule {}
