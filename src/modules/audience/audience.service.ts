import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

import { Audience } from './audience.entity';
import { AudienceDto } from './dto/AudienceDto';
import { AudiencePageDto } from './dto/AudiencePageDto';
import { AudiencePageOptionsDto } from './dto/AudiencePageOptionsDto';

@Injectable()
export class AudienceService {
    constructor(
        @InjectRepository(Audience)
        private readonly audienceRepository: Repository<Audience>,
    ) {}

    async findOne(id: string) {
        return this.audienceRepository.findOne({ id });
    }

    async findOneOrFail(id: string) {
        return this.audienceRepository.findOneOrFail({ id });
    }

    async addAudience(audience: AudienceDto) {
        return this.audienceRepository.save(audience);
    }

    async getAudience(
        audienceOptionsDto: AudiencePageOptionsDto,
    ): Promise<AudiencePageDto> {
        const queryBuilder = this.audienceRepository.createQueryBuilder(
            'audience',
        );
        const [audience, pageMetaDto] = await queryBuilder.paginate(
            audienceOptionsDto,
        );

        return new AudiencePageDto(audience, pageMetaDto);
    }

    async updateAudience({
        id,
        ...rest
    }: DeepPartial<Audience>): Promise<Audience> {
        const audience = await this.audienceRepository.findOneOrFail({
            id,
        });
        return this.audienceRepository.save({ ...audience, ...rest });
    }

    async deleteAudience(id: string): Promise<Audience> {
        return this.updateAudience({
            id,
            deletedAt: new Date(),
        });
    }
}
