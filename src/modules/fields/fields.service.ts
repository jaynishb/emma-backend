import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { FieldDto } from './dto/FieldDto';
import { FieldsPageDto } from './dto/FieldPageDto';
import { FieldPageOptionsDto } from './dto/FieldPageOptionsDto';
import { Field } from './fields.entity';

@Injectable()
export class FieldService {
    private readonly logger = new Logger(FieldService.name);

    constructor(
        @InjectRepository(Field)
        private readonly fieldRepository: Repository<Field>,
    ) {}

    async findOne(id: string) {
        return this.fieldRepository.findOne({ id });
    }

    async findOneOrFail(id: string) {
        return this.fieldRepository.findOneOrFail({ id });
    }

    async findOneByUuid(options: { id?: string }) {
        return this.fieldRepository.findOneOrFail(options);
    }

    async addOrUpdateField(field: DeepPartial<FieldDto>) {
        return this.fieldRepository.save(field);
    }

    async getFields(
        pageOptionsDto: FieldPageOptionsDto,
    ): Promise<FieldsPageDto> {
        const queryBuilder = this.fieldRepository.createQueryBuilder('f');
        const [rulesets, pageMetaDto] = await queryBuilder.paginate(
            pageOptionsDto,
        );

        return new FieldsPageDto(rulesets, pageMetaDto);
    }
}
