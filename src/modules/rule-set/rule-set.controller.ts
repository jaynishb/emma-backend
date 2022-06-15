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
import { Feature } from '../feature/feature.entity';
import { User } from '../user/user.entity';
import { RulesetDto } from './dto/RulesetDto';
import { RulesetsPageDto } from './dto/RulesetPageDto';
import { RulesetsPageOptionsDto } from './dto/RulesetPageOptionsDto';
import { Ruleset } from './rule-set.entity';
import { RuleSetModule } from './rule-set.module';
import { RulesetService } from './rule-set.service';

@Controller('rulesets')
@ApiTags('rulesets')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class RulesetController {
    constructor(
        private rulesetService: RulesetService,
        private readonly _i18n: I18nService,
    ) {}

    @Get()
    @Roles(RoleType.USER)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get rule set list',
        type: RulesetsPageDto,
    })
    async getRulesets(
        @AuthUser() user: User,
        @Query(new ValidationPipe({ transform: true }))
        pageOptionsDto: RulesetsPageOptionsDto,
    ): Promise<RulesetsPageDto> {
        return this.rulesetService.getRulesets(pageOptionsDto);
    }

    @Post()
    @Roles(RoleType.USER)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Created rule set',
        type: Ruleset,
    })
    async addRuleset(
        @AuthUser() user: User,
        @Body() ruleset: RulesetDto,
    ): Promise<Ruleset> {
        let rulesetWithCreatedBy = {
            ...ruleset,
            createdBy: user,
        };
        return this.rulesetService.addRuleset(rulesetWithCreatedBy);
    }

    @Patch(':id')
    @Roles(RoleType.USER)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Updated feature list',
        type: Ruleset,
    })
    async updateRuleset(
        @AuthUser() user: User,
        @Param('id') id: string,
        @Body() ruleset: DeepPartial<Ruleset>,
    ): Promise<Ruleset> {
        console.log(id, ruleset);
        return this.rulesetService.updateRuleset(id, ruleset);
    }

    @Get(':ruleSetKey')
    @Roles(RoleType.USER)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get rule set list',
        type: RulesetsPageDto,
    })
    async getRulesetByRulesetKey(
        @AuthUser() user: User,
        @Param('ruleSetKey') ruleSetKey: string,
    ): Promise<Ruleset> {
        console.log(ruleSetKey);
        return this.rulesetService.findOneByKeyOrUuid({ ruleSetKey });
    }
}
