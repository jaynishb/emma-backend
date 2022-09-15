import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { User } from '../../user/user.entity';

export class ProjectDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    featureCount?: number;

    @Type(() => User)
    @IsNotEmpty()
    @IsOptional()
    createdBy: User;
}
