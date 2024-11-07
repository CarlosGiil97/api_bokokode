import { AppDataSource } from '../../config/database.config';
import { PoblarDbSeed } from './poblar_db.seed';

async function runSeed() {
    try {
        await AppDataSource.initialize();

        const seeder = new PoblarDbSeed(AppDataSource);
        await seeder.run();

        await AppDataSource.destroy();

        console.log('Seed completado exitosamente');
    } catch (error) {
        console.error('Error durante el seed:', error);
        throw error;
    }
}