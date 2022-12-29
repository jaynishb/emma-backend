import { ApiProperty } from '@nestjs/swagger';

import { PageMetaDto } from '../../../common/dto/PageMetaDto';
import { Segments } from '../segments.entity';

export class SegmentsPageDto {
    @ApiProperty({
        type: Segments,
        isArray: true,
    })
    readonly data: Segments[];

    @ApiProperty()
    readonly meta: PageMetaDto;

    constructor(data: Segments[], meta: PageMetaDto) {
        this.data = data;
        this.meta = meta;
    }
}