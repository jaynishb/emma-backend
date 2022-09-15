import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

import { ProjectDto } from './dto/ProjectDto';
import { ProjectsPageDto } from './dto/ProjectPageDto';
import { ProjectsPageOptionsDto } from './dto/ProjectPageOptionsDto';
import { Project } from './project.entity';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
    ) {}

    async findOne(id: string) {
        return this.projectRepository.findOne({ id });
    }

    async findOneOrFail(id: string) {
        return this.projectRepository.findOneOrFail({ id });
    }

    async addProject(project: ProjectDto) {
        return this.projectRepository.save(project);
    }

    async getProjects(
        pageOptionsDto: ProjectsPageOptionsDto,
    ): Promise<ProjectsPageDto> {
        const queryBuilder = this.projectRepository
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.createdBy', 'users')
            .orderBy('p.createdAt', 'DESC');

        const [projects, pageMetaDto] = await queryBuilder.paginate(
            pageOptionsDto,
        );

        return new ProjectsPageDto(projects, pageMetaDto);
    }

    async getFeatureByKey(id: string): Promise<Project> {
        return this.projectRepository.findOneOrFail({ id });
    }

    async updateProjectByUuid({
        id,
        ...rest
    }: DeepPartial<Project>): Promise<Project> {
        const project = await this.projectRepository.findOneOrFail({
            id,
        });
        return this.projectRepository.save({ ...project, ...rest });
    }

    async deleteProjectByUuid(id: string): Promise<Project> {
        return this.updateProjectByUuid({
            id,
            deletedAt: new Date(),
        });
    }
}
