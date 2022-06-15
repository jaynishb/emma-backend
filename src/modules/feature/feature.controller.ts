'use strict';

import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
    UseInterceptors,
    ValidationPipe,
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
import { FeatureDto } from './dto/FeatureDto';
import { FeaturesPageDto } from './dto/FeaturePageDto';
import { FeaturesPageOptionsDto } from './dto/FeaturesPageOptionsDto';
import { Feature } from './feature.entity';
import { FeatureService } from './feature.service';

@Controller('features')
@ApiTags('features')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class FeatureController {
    constructor(
        private featureService: FeatureService,
        private readonly _i18n: I18nService,
    ) {}

    @Get()
    @Roles(RoleType.USER)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get feature list',
        type: FeaturesPageDto,
    })
    async getFeatures(
        @AuthUser() user: User,
        @Query(new ValidationPipe({ transform: true }))
        pageOptionsDto: FeaturesPageOptionsDto,
    ): Promise<FeaturesPageDto> {
        return this.featureService.getFeatures(pageOptionsDto);
    }

    @Get(':featurekey')
    @Roles(RoleType.USER)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get feature list',
        type: FeaturesPageDto,
    })
    async getFeatureByFeatureKey(
        @AuthUser() user: User,
        @Param('featurekey') featureKey: string,
    ): Promise<Feature> {
        console.log(featureKey);
        return this.featureService.getFeatureByKey(featureKey);
    }

    @Patch(':featurekey')
    @Roles(RoleType.USER)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Updated feature list',
        type: FeaturesPageDto,
    })
    async updateFeatureByFeatureKey(
        @AuthUser() user: User,
        @Param('featurekey') featureKey: string,
        @Body() feature: DeepPartial<Feature>,
    ): Promise<Feature> {
        return this.featureService.updateFeatureByKey({
            featureKey,
            ...feature,
        });
    }

    @Post()
    @Roles(RoleType.USER)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Created feature toggle',
        type: Feature,
    })
    async addFeature(
        @AuthUser() user: User,
        @Body() feature: FeatureDto,
    ): Promise<Feature> {
        const featureWithCreatedBy = {
            ...feature,
            createdBy: user,
        };
        return this.featureService.addFeature(featureWithCreatedBy);
    }
}
