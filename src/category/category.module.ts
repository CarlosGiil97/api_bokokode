import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './infrastructure/controllers/category.controller';
import { CategoryService } from './application/services/category.service';
import { CategoryRepository } from './infrastructure/persistence/category.repository';
import { Category } from './domain/entities/category.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    controllers: [CategoryController],
    providers: [
        CategoryService,
        {
            provide: 'ICategoryRepository',
            useClass: CategoryRepository,
        }
    ],
    exports: [CategoryService],
})
export class CategoryModule { }