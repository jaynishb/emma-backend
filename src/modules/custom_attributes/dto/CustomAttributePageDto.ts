
import { ApiProperty } from "@nestjs/swagger";

import { PageMetaDto } from '../../../common/dto/PageMetaDto';
import { CustomAttribute } from "../customAttribute.entity";

export class CustomAttributePageDto{
    @ApiProperty({
        type: CustomAttribute,
        isArray: true,
    })
    readonly data: CustomAttribute[];

    @ApiProperty()
    readonly meta: PageMetaDto;

    constructor(data: CustomAttribute[], meta: PageMetaDto) {
        this.data = data;
        this.meta = meta;
    }
}