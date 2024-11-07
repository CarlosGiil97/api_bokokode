import { DataSource, DataSourceOptions } from 'typeorm';
import { registerAs } from '@nestjs/config';
import { Category } from '../category/domain/entities/category.entity';
import { Product } from '../product/domain/entities/product.entity';

export const databaseConfig = registerAs('database', () => ({
    type: 'sqlite' as const,
    database: 'database.sqlite',
    entities: [Category, Product],
    synchronize: true,
    logging: true
}));

export const dataSourceOptions: DataSourceOptions = {
    type: 'sqlite',
    database: 'database.sqlite',
    entities: [Category, Product],
    synchronize: true,
    logging: true
};

export const AppDataSource = new DataSource(dataSourceOptions);
