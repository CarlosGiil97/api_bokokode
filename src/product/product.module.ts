import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './infrastructure/controllers/product.controller';
import { ProductService } from './application/services/product.service';
import { ProductRepository } from './infrastructure/persistence/product.repository';
import { Product } from './domain/entities/product.entity';
import { CategoryModule } from '../category/category.module';
import { ProductRecommendationService } from './application/services/product-recomendation.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Product]),
        CategoryModule
    ],
    controllers: [ProductController],
    providers: [
        ProductService,
        {
            provide: 'IProductRepository',
            useClass: ProductRepository,
        },
        ProductRecommendationService
    ],
    exports: [ProductService],
})
export class ProductModule { }