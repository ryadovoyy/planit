import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

import { UserWithRolesDto } from './dto/user-with-roles.dto';
import { UserWithRolesData, UserWithRolesDtoData } from './users.types';

@Injectable()
export class UserMappingInterceptor
  implements NestInterceptor<UserWithRolesData, UserWithRolesDtoData>
{
  intercept(
    _context: ExecutionContext,
    next: CallHandler<UserWithRolesData>,
  ): Observable<UserWithRolesDtoData> {
    return next.handle().pipe(
      map((userData) => {
        if (Array.isArray(userData)) {
          return userData.map((user) => new UserWithRolesDto(user));
        } else {
          return new UserWithRolesDto(userData);
        }
      }),
    );
  }
}
