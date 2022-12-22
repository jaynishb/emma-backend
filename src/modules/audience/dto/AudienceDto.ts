import { IsOptional, IsString } from 'class-validator';

export class AudienceDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    email: string;

    @IsOptional()
    customAttributes: Record<string, any>[];
}
