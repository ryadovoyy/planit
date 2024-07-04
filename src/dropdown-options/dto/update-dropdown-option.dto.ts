import { OmitType, PartialType } from '@nestjs/swagger';

import { CreateDropdownOptionDto } from './create-dropdown-option.dto';

export class UpdateDropdownOptionDto extends PartialType(
  OmitType(CreateDropdownOptionDto, ['taskFieldId'] as const),
) {}
