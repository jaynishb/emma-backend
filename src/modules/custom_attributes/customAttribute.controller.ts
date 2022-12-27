import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query, UseGuards, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ArrayUnique } from "class-validator";
import { RoleType } from '../../common/constants/role-type';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { Roles } from '../../decorators/roles.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';
import { I18nService } from "nestjs-i18n";
import { User } from '../user/user.entity';
import { CustomAttributeService } from "./customAttribute.service";
import { CustomAttributePageDto } from "./dto/CustomAttributePageDto";
import { CustomAttributeDto } from "./dto/CustomAttributeDto";
import { CustomAttribute } from "./customAttribute.entity";
import { CustomAttributePageOptionsDto } from "./dto/CustomAttributePageOptionDto";




@Controller('customAttribute')
@ApiTags('customAttribute')
@UseGuards(AuthGuard,RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()



export class CustomAttributeController{
    constructor(
        private customAttributeService: CustomAttributeService,
        private readonly _i18n: I18nService,
    ){}
    
    @Get()
    @Roles(RoleType.USER)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get Custom_attribute List',
        type: CustomAttributePageDto,
    })
    async getCustomAttribute(
        @AuthUser() user: User,
        @Query(new ValidationPipe({ transform: true }))
        pageOptionsDto: CustomAttributePageOptionsDto,
    ): Promise<CustomAttributePageDto> {
        return this.customAttributeService.getCustomAttribute(pageOptionsDto);
    }

    @Post()
    @Roles(RoleType.USER)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Created Custom attribute',
        type: CustomAttribute,
    })
    async addCustom_attribute(
        @AuthUser() user: User,
        @Body() custom_attribut: CustomAttributeDto,
    ): Promise<CustomAttribute> {
        const custom_attributeWithCreatedBy = {
            ...custom_attribut,
            createdBy: user,
        };
        return this.customAttributeService.addCustomAttribute(custom_attributeWithCreatedBy);
    }


}