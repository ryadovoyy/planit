import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

import { RoleDto } from 'src/roles/dto/role.dto';
import { UserWithRoles } from '../users.types';

export class UserWithRolesDto {
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

  @ApiProperty({ type: RoleDto, isArray: true })
  roles: RoleDto[];

  constructor(user: UserWithRoles) {
    Object.assign(this, user);
  }
}
