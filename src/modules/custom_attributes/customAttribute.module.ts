import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';    
import { CustomAttributeController } from './customAttribute.controller';
import { CustomAttribute } from './customAttribute.entity';
import { CustomAttributeService } from './customAttribute.service';


@Module({
    imports : [TypeOrmModule.forFeature([CustomAttribute])],
    exports: [CustomAttributeService],
    providers: [CustomAttributeService],
    controllers: [CustomAttributeController]
})
export class CustomAttributeModule {}