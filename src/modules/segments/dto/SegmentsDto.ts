import {  IsOptional, IsString } from 'class-validator';

export class SegmentsDto{

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    filterRules: Record<string, any>[];

}