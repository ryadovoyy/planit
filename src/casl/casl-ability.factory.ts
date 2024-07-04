import { AbilityBuilder } from '@casl/ability';
import { createPrismaAbility } from '@casl/prisma';
import { Injectable } from '@nestjs/common';

import { UserInfo } from 'src/auth/auth.types';
import { RoleEnum } from 'src/roles/role.enum';
import { AppAbility } from './casl.types';

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: UserInfo): AppAbility {
    const { can, build } = new AbilityBuilder<AppAbility>(createPrismaAbility);

    if (user.roles.includes(RoleEnum.Admin)) {
      can('manage', 'all');
    } else {
      can('manage', 'User', { id: user.id });
      can('manage', 'Project', { userId: user.id });

      can('manage', 'List', {
        project: {
          is: { userId: user.id },
        },
      });

      can('manage', 'Task', {
        list: {
          is: {
            project: {
              is: { userId: user.id },
            },
          },
        },
      });

      can('manage', 'TaskField', {
        project: {
          is: { userId: user.id },
        },
      });

      can('manage', 'TaskFieldDropdownOption', {
        taskField: {
          is: {
            project: {
              is: { userId: user.id },
            },
          },
        },
      });
    }

    return build();
  }
}
