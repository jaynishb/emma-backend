import './boilerplate.polyfill';

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I18nJsonParser, I18nModule } from 'nestjs-i18n';
import * as path from 'path';

import { contextMiddleware } from './middlewares';
import { AudienceModule } from './modules/audience/audience.module';
import { AuthModule } from './modules/auth/auth.module';
import { FeatureModule } from './modules/feature/feature.module';
import { FieldModule } from './modules/fields/fields.module';
import { MathModule } from './modules/math/math.module';
import { ProjectModule } from './modules/projects/project.module';
import { RuleSetModule } from './modules/rule-set/rule-set.module';
import { UserModule } from './modules/user/user.module';
import { ConfigService } from './shared/services/config.service';
import { SharedModule } from './shared/shared.module';

@Module({
    imports: [
        AuthModule,
        UserModule,
        FeatureModule,
        RuleSetModule,
        MathModule,
        FieldModule,
        ProjectModule,
        AudienceModule,
        TypeOrmModule.forRootAsync({
            imports: [SharedModule],
            useFactory: (configService: ConfigService) =>
                configService.typeOrmConfig,
            inject: [ConfigService],
        }),
        I18nModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                fallbackLanguage: configService.fallbackLanguage,
                parserOptions: {
                    path: path.join(__dirname, '/i18n/'),
                    watch: configService.isDevelopment,
                },
            }),
            imports: [SharedModule],
            parser: I18nJsonParser,
            inject: [ConfigService],
        }),
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
        consumer.apply(contextMiddleware).forRoutes('*');
    }
}
