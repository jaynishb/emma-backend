import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeatureController } from './feature.controller';
import { Feature } from './feature.entity';
import { FeatureService } from './feature.service';

@Module({
    imports: [TypeOrmModule.forFeature([Feature])],
    controllers: [FeatureController],
    exports: [FeatureService],
    providers: [FeatureService],
})
export class FeatureModule {}
