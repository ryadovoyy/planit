import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { UserInfo } from 'src/auth/auth.types';

@Injectable()
export class OwnUserGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user: UserInfo = req.user;
    return user.id === +req.params.id || user.roles.includes('ADMIN');
  }
}
