import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProjectController } from './project.controller';
import { Project } from './project.entity';
import { ProjectService } from './project.service';

@Module({
    imports: [TypeOrmModule.forFeature([Project])],
    controllers: [ProjectController],
    exports: [ProjectService],
    providers: [ProjectService],
})
export class ProjectModule {}
