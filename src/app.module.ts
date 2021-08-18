import { Module } from '@nestjs/common';
import { ConfigModule } from './modules/config/config.module';
import { UsersModule } from './modules/users/users.module';


@Module({
  imports: [
    ConfigModule,
    UsersModule,
  ],
})
export class AppModule {}
