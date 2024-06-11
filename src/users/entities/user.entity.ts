import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

import { RoleEntity } from 'src/roles/entities/role.entity';
import { UserWithRoles } from '../users.types';

export class UserEntity implements UserWithRoles {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty({ type: String, nullable: true })
  name: string | null;

  @Exclude()
  password: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ type: RoleEntity, isArray: true })
  roles: RoleEntity[];

  constructor(user: UserWithRoles) {
    Object.assign(this, user);
  }
}
