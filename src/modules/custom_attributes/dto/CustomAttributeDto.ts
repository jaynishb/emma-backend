
import {  IsOptional, IsString } from 'class-validator';

export class CustomAttributeDto{

    @IsOptional()
    @IsString()
    key: string;

    @IsOptional()
    @IsString()
    value: string;



    
}