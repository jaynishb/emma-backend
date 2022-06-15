import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { RulesetDto } from './dto/RulesetDto';
import { RulesetsPageDto } from './dto/RulesetPageDto';
import { RulesetsPageOptionsDto } from './dto/RulesetPageOptionsDto';
import { Ruleset } from './rule-set.entity';

@Injectable()
export class RulesetService {
    private readonly logger = new Logger(RulesetService.name);

    constructor(
        @InjectRepository(Ruleset)
        private readonly rulesetRepository: Repository<Ruleset>,
    ) {}

    async findOne(id: string) {
        return this.rulesetRepository.findOne({ id });
    }

    async findOneOrFail(id: string) {
        return this.rulesetRepository.findOneOrFail({ id });
    }

    async findOneByKeyOrUuid(options: { ruleSetKey?: string; id?: string }) {
        return this.rulesetRepository.findOneOrFail(options);
    }

    async addRuleset(ruleset: RulesetDto) {
        return this.rulesetRepository.save(ruleset);
    }

    async updateRuleset(
        id: string,
        ruleset: DeepPartial<Ruleset>,
    ): Promise<Ruleset> {
        return this.rulesetRepository.save({ id, ...ruleset });
    }

    async getRulesets(
        pageOptionsDto: RulesetsPageOptionsDto,
    ): Promise<RulesetsPageDto> {
        const queryBuilder = this.rulesetRepository.createQueryBuilder('f');
        const [rulesets, pageMetaDto] = await queryBuilder.paginate(
            pageOptionsDto,
        );

        return new RulesetsPageDto(rulesets, pageMetaDto);
    }
}
