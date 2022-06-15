import { ApiProperty } from '@nestjs/swagger';

import { PageMetaDto } from '../../../common/dto/PageMetaDto';
import { Ruleset } from '../rule-set.entity';

export class RulesetsPageDto {
    @ApiProperty({
        type: Ruleset,
        isArray: true,
    })
    readonly data: Ruleset[];

    @ApiProperty()
    readonly meta: PageMetaDto;

    constructor(data: Ruleset[], meta: PageMetaDto) {
        this.data = data;
        this.meta = meta;
    }
}
