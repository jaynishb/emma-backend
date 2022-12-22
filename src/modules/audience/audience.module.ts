import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AudienceController } from './audience.controller';
import { Audience } from './audience.entity';
import { AudienceService } from './audience.service';

@Module({
    imports: [TypeOrmModule.forFeature([Audience])],
    exports: [AudienceService],
    providers: [AudienceService],
    controllers: [AudienceController],
})
export class AudienceModule {}
