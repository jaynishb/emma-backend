import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SegmentsDto } from './dto/SegmentsDto';
import { SegmentsPageDto } from './dto/SegmentsPageDto';
import { SegmentsPageOptionsDto } from './dto/SegmentsPageOptionsDto';
import { Segments } from './segments.entity';

@Injectable()
export class SegmentsService {
    constructor(
        @InjectRepository(Segments)
        private readonly segmentsRepository: Repository<Segments>,
    ) {}

    async findOne(id: string) {
        return this.segmentsRepository.findOne({ id });
    }

    async findOneOrFail(id: string) {
        return this.segmentsRepository.findOneOrFail({ id });
    }

    async addSegments(segments: SegmentsDto) {
        return this.segmentsRepository.save(segments);
    }

    async getSegments(
        segmentsOptionsDto: SegmentsPageOptionsDto,
    ): Promise<SegmentsPageDto> {
        const queryBuilder = this.segmentsRepository.createQueryBuilder(
            'segments',
        );
        const [segments, pageMetaDto] = await queryBuilder.paginate(
            segmentsOptionsDto,
        );

        return new SegmentsPageDto(segments, pageMetaDto);
    }
}