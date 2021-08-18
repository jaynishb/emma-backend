import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './config.service';
import typeormConfig from '../../orm-config';

const services = [ConfigService];

@Module({
  providers: services,
  exports: services,
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
  ],
})
export class ConfigModule {
  static asyncOptsProvider = {
    useExisting: ConfigService,
  };
}
