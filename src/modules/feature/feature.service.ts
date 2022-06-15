import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

import { FeatureDto } from './dto/FeatureDto';
import { FeaturesPageDto } from './dto/FeaturePageDto';
import { FeaturesPageOptionsDto } from './dto/FeaturesPageOptionsDto';
import { Feature } from './feature.entity';

@Injectable()
export class FeatureService {
    private readonly logger = new Logger(FeatureService.name);

    constructor(
        @InjectRepository(Feature)
        private readonly featureRepository: Repository<Feature>,
    ) {}

    async findOne(id: string) {
        return this.featureRepository.findOne({ id });
    }

    async findOneOrFail(id: string) {
        return this.featureRepository.findOneOrFail({ id });
    }

    async findOneByKeyOrUuid(options: { key: string; id: string }) {
        return this.featureRepository.findOneOrFail(options);
    }

    async addFeature(feature: FeatureDto) {
        return this.featureRepository.save(feature);
    }

    async getFeatures(
        pageOptionsDto: FeaturesPageOptionsDto,
    ): Promise<FeaturesPageDto> {
        const queryBuilder = this.featureRepository
            .createQueryBuilder('f')
            .leftJoinAndSelect('f.ruleset', 'ruleset')
            .leftJoinAndSelect('f.createdBy', 'users')
            .orderBy('f.createdAt', 'DESC');

        const [features, pageMetaDto] = await queryBuilder.paginate(
            pageOptionsDto,
        );

        return new FeaturesPageDto(features, pageMetaDto);
    }

    async getFeatureByKey(featureKey: string): Promise<Feature> {
        return this.featureRepository.findOneOrFail({ featureKey });
    }

    async updateFeatureByKey({
        featureKey,
        ...rest
    }: DeepPartial<Feature>): Promise<Feature> {
        const feature = await this.featureRepository.findOneOrFail({
            featureKey,
        });
        return this.featureRepository.save({ ...feature, ...rest });
    }
}
