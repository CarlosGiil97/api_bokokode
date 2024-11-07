import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { databaseConfig } from './config/database.config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PaginationInterceptor } from './helpers/interceptors/pagination.interceptor';


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [databaseConfig],
        }),
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'database.sqlite',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
            logging: true,
        }),
        ProductModule,
        CategoryModule,
    ],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: PaginationInterceptor,
        },
    ],
})
export class AppModule { }