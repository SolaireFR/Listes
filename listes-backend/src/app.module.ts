import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './utils/config/configuration';
import { validate } from './utils/config/env.validation';
import { LoggerMiddleware } from './utils/middleware/logger.middleware';
import { List, ListSchema } from './schemas/list.schema';
import { ListsController } from './controllers/lists.controller';
import { ListsService } from './services/lists.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
            validate,
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                uri: configService.get<string>('mongodb.uri'),
            }),
            inject: [ConfigService],
        }),
        MongooseModule.forFeature([{ name: List.name, schema: ListSchema }]),
    ],
    controllers: [ListsController],
    providers: [ListsService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
