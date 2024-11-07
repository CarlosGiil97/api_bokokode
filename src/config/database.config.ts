// src/config/database.config.ts
import { DataSource } from 'typeorm';
import { registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('database', () => ({
    type: 'sqlite',
    database: 'database.sqlite',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
}));

export const dataSource = new DataSource({
    type: 'sqlite',
    database: 'database.sqlite',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
});