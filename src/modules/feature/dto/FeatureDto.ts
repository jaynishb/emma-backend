import { Type } from 'class-transformer';
import {
    IsArray,
    IsBoolean,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';

import { Ruleset } from '../../rule-set/rule-set.entity';
import { User } from '../../user/user.entity';

export class FeatureDto {
    @IsString()
    name: string;

    @IsString()
    featureKey: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsBoolean()
    enabled?: boolean;

    @IsOptional()
    @IsArray()
    tags?: string[];

    @Type(() => Ruleset)
    @IsOptional()
    ruleset?: Ruleset;

    @Type(() => User)
    @IsNotEmpty()
    @IsOptional()
    createdBy: User;
}
