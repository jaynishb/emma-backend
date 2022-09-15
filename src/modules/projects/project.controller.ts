'use strict';

import {
    Body,
    Controller,
    Delete,
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
import { DeepPartial } from 'typeorm';

import { RoleType } from '../../common/constants/role-type';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { Roles } from '../../decorators/roles.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';
import { User } from '../user/user.entity';
import { ProjectDto } from './dto/ProjectDto';
import { ProjectsPageDto } from './dto/ProjectPageDto';
import { ProjectsPageOptionsDto } from './dto/ProjectPageOptionsDto';
import { Project } from './project.entity';
import { ProjectService } from './project.service';

@Controller('projects')
@ApiTags('projects')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class ProjectController {
    constructor(private projectService: ProjectService) {}

    @Get()
    @Roles(RoleType.USER)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get project list',
        type: ProjectsPageDto,
    })
    async getProjects(
        @Query(new ValidationPipe({ transform: true }))
        pageOptionsDto: ProjectsPageOptionsDto,
    ): Promise<ProjectsPageDto> {
        return this.projectService.getProjects(pageOptionsDto);
    }

    @Get(':uuid')
    @Roles(RoleType.USER)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get project',
        type: ProjectsPageDto,
    })
    async getProjectByUuid(@Param('uuid') id: string): Promise<Project> {
        const project = await this.projectService.findOneOrFail(id);

        return project;
    }

    @Patch(':uuid')
    @Roles(RoleType.USER)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Updated project list',
        type: ProjectsPageDto,
    })
    async updateProjectByUuid(
        @Param('uuid') id: string,
        @Body() project: DeepPartial<Project>,
    ): Promise<Project> {
        return this.projectService.updateProjectByUuid({
            id,
            ...project,
        });
    }

    @Post()
    @Roles(RoleType.USER)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Created project',
        type: Project,
    })
    async addFeature(
        @AuthUser() user: User,
        @Body() project: ProjectDto,
    ): Promise<Project> {
        const featureWithCreatedBy = {
            ...project,
            createdBy: user,
        };
        return this.projectService.addProject(featureWithCreatedBy);
    }

    @Delete(':uuid')
    @Roles(RoleType.USER)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Deleted project list',
        type: ProjectsPageDto,
    })
    async deleteProjectByUuid(@Param('uuid') uuid: string): Promise<Project> {
        return this.projectService.deleteProjectByUuid(uuid);
    }
}
