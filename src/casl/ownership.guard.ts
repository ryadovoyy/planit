import { ForbiddenError, subject } from '@casl/ability';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ParseIntPipe,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { RequestWithUser } from 'src/auth/auth.types';
import { CaslAbilityFactory } from './casl-ability.factory';
import { Resource } from './casl.types';
import { CHECK_OWNERSHIP_KEY } from './check-ownership.decorator';
import { OwnershipStrategyFactory } from './ownership-strategy.factory';

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly caslAbilityFactory: CaslAbilityFactory,
    private readonly ownershipStrategyFactory: OwnershipStrategyFactory,
    private readonly parseIntPipe: ParseIntPipe,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const resources = this.reflector.getAllAndMerge<Resource[]>(
      CHECK_OWNERSHIP_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!resources.length) {
      return true;
    }

    const req = context.switchToHttp().getRequest<RequestWithUser>();
    const ability = this.caslAbilityFactory.createForUser(req.user);

    try {
      for (const resource of resources) {
        const { subject: sub, store, id, isOptional } = resource;

        const subjectName = sub.toString();
        const subjectId = req[store][id];

        if (!subjectId && isOptional) {
          continue;
        }

        const parsedSubjectId = await this.parseIntPipe.transform(subjectId, {
          type: 'custom',
        });

        const strategy = this.ownershipStrategyFactory.getStrategy(sub);
        const fetchedSubject =
          await strategy.findSubjectWithUserId(parsedSubjectId);

        ForbiddenError.from(ability).throwUnlessCan(
          'manage',
          subject(subjectName, fetchedSubject),
        );
      }

      return true;
    } catch (err) {
      if (err instanceof ForbiddenError) {
        return false;
      }
      throw err;
    }
  }
}
