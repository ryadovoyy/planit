import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

import { UserEntity } from './entities/user.entity';
import { UserEntityData, UserWithRolesData } from './users.types';

@Injectable()
export class UserMappingInterceptor
  implements NestInterceptor<UserWithRolesData, UserEntityData>
{
  intercept(
    _context: ExecutionContext,
    next: CallHandler<UserWithRolesData>,
  ): Observable<UserEntityData> {
    return next.handle().pipe(
      map((userData) => {
        if (Array.isArray(userData)) {
          return userData.map((user) => new UserEntity(user));
        } else {
          return new UserEntity(userData);
        }
      }),
    );
  }
}
