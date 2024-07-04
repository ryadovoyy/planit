import { SetMetadata } from '@nestjs/common';

import { AppSubject, Resource } from './casl.types';

const getDefaultId = (subject: AppSubject): string => {
  const subjectName = subject.toString();
  return subjectName.charAt(0).toLowerCase() + subjectName.slice(1) + 'Id';
};

export const CHECK_OWNERSHIP_KEY = 'checkOwnership';

export const CheckOwnership = (...resources: Resource[]) =>
  SetMetadata(CHECK_OWNERSHIP_KEY, resources);

export const CheckOwnershipInParams = (subject: AppSubject) =>
  CheckOwnership({ subject, store: 'params', id: 'id' });

export const CheckOwnershipInBody = (subject: AppSubject) =>
  CheckOwnership({ subject, store: 'body', id: getDefaultId(subject) });

export const CheckOwnershipInQuery = (subject: AppSubject) =>
  CheckOwnership({ subject, store: 'query', id: getDefaultId(subject) });
