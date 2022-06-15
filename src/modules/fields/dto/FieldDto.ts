import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { User } from '../../user/user.entity';
import { FieldType } from '../enum/field-type.enum';

export class FieldDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    id?: string;

    @IsString()
    @IsNotEmpty()
    name?: string;

    @IsEnum(FieldType)
    type?: FieldType;

    @Type(() => User)
    @IsOptional()
    createdBy?: User;
}
