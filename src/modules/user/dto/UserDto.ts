'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { RoleType } from '../../../common/constants/role-type';
import { AbstractDto } from '../../../common/dto/AbstractDto';

export class UserDto extends AbstractDto {
    @ApiPropertyOptional()
    firstName: string;

    @ApiPropertyOptional()
    lastName: string;

    @ApiPropertyOptional({ enum: RoleType })
    role: RoleType;

    @ApiPropertyOptional()
    email: string;

    @ApiPropertyOptional()
    avatar: string;

    @ApiPropertyOptional()
    phone: string;
}
