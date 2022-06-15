import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RulesetController } from './rule-set.controller';
import { Ruleset } from './rule-set.entity';
import { RulesetService } from './rule-set.service';

@Module({
    imports: [TypeOrmModule.forFeature([Ruleset])],
    controllers: [RulesetController],
    exports: [RulesetService],
    providers: [RulesetService],
})
export class RuleSetModule {}
