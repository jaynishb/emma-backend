import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Query,
    UseGuards,
    UseInterceptors,
    ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { I18nService } from 'nestjs-i18n';

import { RoleType } from '../../common/constants/role-type';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { Roles } from '../../decorators/roles.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';
import { User } from '../user/user.entity';
import { Audience } from './audience.entity';
import { AudienceService } from './audience.service';
import { AudienceDto } from './dto/AudienceDto';
import { AudiencePageDto } from './dto/AudiencePageDto';
import { AudiencePageOptionsDto } from './dto/AudiencePageOptionsDto';

@Controller('audience')
@ApiTags('audience')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class AudienceController {
    constructor(
        private audienceService: AudienceService,
        private readonly _i18n: I18nService,
    ) {}

    @Get()
    @Roles(RoleType.USER)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get Audience List',
        type: AudiencePageDto,
    })
    async getAudience(
        @AuthUser() user: User,
        @Query(new ValidationPipe({ transform: true }))
        pageOptionsDto: AudiencePageOptionsDto,
    ): Promise<AudiencePageDto> {
        return this.audienceService.getAudience(pageOptionsDto);
    }

    @Post()
    @Roles(RoleType.USER)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Created audience toggle',
        type: Audience,
    })
    async addAudience(
        @AuthUser() user: User,
        @Body() audience: AudienceDto,
    ): Promise<Audience> {
        const audienceWithCreatedBy = {
            ...audience,
            createdBy: user,
        };
        return this.audienceService.addAudience(audienceWithCreatedBy);
    }

    @Delete(':uuid')
    @Roles(RoleType.USER)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Deleted audience list',
        type: AudiencePageDto,
    })
    async deleteAudience(@Param('uuid') uuid: string): Promise<Audience> {
        return this.audienceService.deleteAudience(uuid);
    }
}
