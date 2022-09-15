import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

import { PageOptionsDto } from '../../../common/dto/PageOptionsDto';

export class ProjectsPageOptionsDto extends PageOptionsDto {
    @IsOptional()
    @IsString({ each: true })
    @Type(() => String)
    @Transform(({ value }) => String(value).trim().split(','))
    tags?: string[];
}
