import { ApiProperty } from '@nestjs/swagger';

import { PageMetaDto } from '../../../common/dto/PageMetaDto';
import { Project } from '../project.entity';

export class ProjectsPageDto {
    @ApiProperty({
        type: Project,
        isArray: true,
    })
    readonly data: Project[];

    @ApiProperty()
    readonly meta: PageMetaDto;

    constructor(data: Project[], meta: PageMetaDto) {
        this.data = data;
        this.meta = meta;
    }
}
