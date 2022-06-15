'use strict';

import {
    Controller,
    Get,
    Post,
    HttpCode,
    HttpStatus,
    Query,
    UseGuards,
    UseInterceptors,
    ValidationPipe,
    Body,
    Param,
    Patch,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { I18nService } from 'nestjs-i18n';
import { DeepPartial } from 'typeorm';

import { RoleType } from '../../common/constants/role-type';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { Roles } from '../../decorators/roles.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';
import { User } from '../user/user.entity';
import { FieldDto } from './dto/FieldDto';
import { FieldsPageDto } from './dto/FieldPageDto';
import { FieldPageOptionsDto } from './dto/FieldPageOptionsDto';
import { Field } from './fields.entity';
import { FieldService } from './fields.service';

@Controller('fields')
@ApiTags('fields')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class FieldController {
    constructor(
        private fieldService: FieldService,
        private readonly _i18n: I18nService,
    ) {}

    @Get()
    @Roles(RoleType.USER)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get field list',
        type: FieldsPageDto,
    })
    async getFields(
        @AuthUser() user: User,
        @Query(new ValidationPipe({ transform: true }))
        pageOptionsDto: FieldPageOptionsDto,
    ): Promise<FieldsPageDto> {
        return this.fieldService.getFields(pageOptionsDto);
    }

    @Post()
    @Roles(RoleType.USER)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Created field',
        type: Field,
    })
    async addField(
        @AuthUser() user: User,
        @Body() field: FieldDto,
    ): Promise<Field> {
        let fieldWithCreatedBy = {
            ...field,
            createdBy: user,
        };
        return this.fieldService.addOrUpdateField(fieldWithCreatedBy);
    }

    @Get(':id')
    @Roles(RoleType.USER)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get field',
        type: FieldsPageDto,
    })
    async getFieldById(
        @AuthUser() user: User,
        @Param('id') id: string,
    ): Promise<Field> {
        console.log(id);
        return this.fieldService.findOneByUuid({ id });
    }

    @Patch(':id')
    @Roles(RoleType.USER)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Updated feature list',
        type: FieldsPageDto,
    })
    async updateFeatureByFeatureKey(
        @AuthUser() user: User,
        @Param('id') id: string,
        @Body() field: DeepPartial<FieldDto>,
    ): Promise<FieldDto> {
        console.log(id, field, 'heyyyy');
        return this.fieldService.addOrUpdateField({
            id,
            ...field,
        });
    }
}