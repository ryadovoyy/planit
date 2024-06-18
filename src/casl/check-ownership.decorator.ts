import { SetMetadata } from '@nestjs/common';

import { AppSubject, Resource } from './casl.types';

export const CHECK_OWNERSHIP_KEY = 'checkOwnership';

export const CheckOwnership = (...resources: Resource[]) =>
  SetMetadata(CHECK_OWNERSHIP_KEY, resources);

export const CheckOwnershipInParams = (subject: AppSubject) =>
  CheckOwnership({ subject, store: 'params', id: 'id' });
