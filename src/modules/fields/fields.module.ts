import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FieldController } from './fields.controller';
import { Field } from './fields.entity';
import { FieldService } from './fields.service';

@Module({
    imports: [TypeOrmModule.forFeature([Field])],
    controllers: [FieldController],
    exports: [FieldService],
    providers: [FieldService],
})
export class FieldModule {}
