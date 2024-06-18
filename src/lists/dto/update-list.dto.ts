import { OmitType, PartialType } from '@nestjs/swagger';

import { CreateListDto } from './create-list.dto';

export class UpdateListDto extends PartialType(
  OmitType(CreateListDto, ['projectId'] as const),
) {}
