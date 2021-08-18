import { Injectable } from '@nestjs/common';
import {
  TypeOrmOptionsFactory,
  TypeOrmModuleAsyncOptions,
} from '@nestjs/typeorm';

@Injectable()
export class ConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleAsyncOptions {
    return {
      useFactory: () => ({} as any),
    };
  }
}
