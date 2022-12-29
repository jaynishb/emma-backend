import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SegmentsController } from './segments.controller';
import { Segments } from './segments.entity';
import { SegmentsService } from './segments.services';

@Module({
    imports: [TypeOrmModule.forFeature([Segments])],
    exports: [SegmentsService],
    providers: [SegmentsService],
    controllers: [SegmentsController],
})
export class SegmentsModule {}