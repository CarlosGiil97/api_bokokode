import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../domain/entities/product.entity';
import { IProductRepository } from '../../domain/repositories/product.repository.interface';
import { CreateProductDto } from '../../application/dtos/create-product.dto';
import { UpdateProductDto } from '../../application/dtos/update-product.dto';
import { GetProductsFilterDto } from '../../application/dtos/get-products-filter.dto';

@Injectable()
export class ProductRepository implements IProductRepository {
    constructor(
        @InjectRepository(Product)
        private readonly repository: Repository<Product>,
    ) { }

    async findAll(filters?: GetProductsFilterDto): Promise<Product[]> {
        const queryBuilder = this.repository
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.category', 'category')
            .where('product.isActive = :isActive', { isActive: true });

        if (filters?.categories?.length) {
            queryBuilder.andWhere('category.id IN (:...categories)', {
                categories: filters.categories,
            });
        }

        if (filters?.sort) {
            queryBuilder.orderBy(`product.${filters.sort.key}`, filters.sort.type);
        }

        return queryBuilder.getMany();
    }

    async findById(id: string): Promise<Product | null> {
        return this.repository.findOne({
            where: { id, isActive: true },
            relations: ['category']
        });
    }

    async create(productDto: CreateProductDto): Promise<Product> {
        const product = this.repository.create(productDto);
        return this.repository.save(product);
    }

    async update(id: string, productDto: UpdateProductDto): Promise<Product> {
        await this.repository.update(id, productDto);
        return this.findById(id);
    }

    async delete(id: string): Promise<void> {
        await this.repository.update(id, { isActive: false });
    }
}