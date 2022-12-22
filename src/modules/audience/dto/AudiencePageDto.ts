import { ApiProperty } from '@nestjs/swagger';

import { PageMetaDto } from '../../../common/dto/PageMetaDto';
import { Audience } from '../audience.entity';

export class AudiencePageDto {
    @ApiProperty({
        type: Audience,
        isArray: true,
    })
    readonly data: Audience[];

    @ApiProperty()
    readonly meta: PageMetaDto;

    constructor(data: Audience[], meta: PageMetaDto) {
        this.data = data;
        this.meta = meta;
    }
}
