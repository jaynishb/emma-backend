import {
    Body,
    Controller,
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
import { SegmentsDto } from './dto/SegmentsDto';
import { SegmentsPageDto } from './dto/SegmentsPageDto';
import { SegmentsPageOptionsDto } from './dto/SegmentsPageOptionsDto';
import { Segments } from './segments.entity';
import { SegmentsService } from './segments.services';

@Controller('segments')
@ApiTags('segments')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class SegmentsController {
    constructor(
        private segmentsService: SegmentsService,
        private readonly _i18n: I18nService,
    ) {}

    @Get()
    @Roles(RoleType.USER)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get segments ',
        type: SegmentsPageDto,
    })
    async getSegments(
        @AuthUser() user: User,
        @Query(new ValidationPipe({ transform: true }))
        pageOptionsDto: SegmentsPageOptionsDto,
    ): Promise<SegmentsPageDto> {
        return this.segmentsService.getSegments(pageOptionsDto);
    }

    @Post()
    @Roles(RoleType.USER)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Created segments',
        type: Segments,
    })
    async addSegments(
        @AuthUser() user: User,
        @Body() segments: SegmentsDto,
    ): Promise<Segments> {
        return this.segmentsService.addSegments(segments);
    }

}