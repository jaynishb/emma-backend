import { ApiProperty } from '@nestjs/swagger';

import { PageMetaDto } from '../../../common/dto/PageMetaDto';
import { Field } from '../fields.entity';

export class FieldsPageDto {
    @ApiProperty({
        type: Field,
        isArray: true,
    })
    readonly data: Field[];

    @ApiProperty()
    readonly meta: PageMetaDto;

    constructor(data: Field[], meta: PageMetaDto) {
        this.data = data;
        this.meta = meta;
    }
}
