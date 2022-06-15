import { ApiProperty } from '@nestjs/swagger';

import { PageMetaDto } from '../../../common/dto/PageMetaDto';
import { Feature } from '../feature.entity';

export class FeaturesPageDto {
    @ApiProperty({
        type: Feature,
        isArray: true,
    })
    readonly data: Feature[];

    @ApiProperty()
    readonly meta: PageMetaDto;

    constructor(data: Feature[], meta: PageMetaDto) {
        this.data = data;
        this.meta = meta;
    }
}
