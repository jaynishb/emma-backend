import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { User } from '../../user/user.entity';

export class RulesetDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    ruleSetKey: string;

    @IsOptional()
    @IsString()
    description?: string;

    @Type(() => User)
    @IsOptional()
    createdBy?: User;
}
