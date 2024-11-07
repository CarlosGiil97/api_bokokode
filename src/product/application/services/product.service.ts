import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { IProductRepository } from '../../domain/repositories/product.repository.interface';
import { CategoryService } from '../../../category/application/services/category.service';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { ProductResponseDto } from '../dtos/product-response.dto';
import { GetProductsFilterDto } from '../dtos/get-products-filter.dto';

@Injectable()
export class ProductService {
    constructor(
        @Inject('IProductRepository')
        private readonly productRepository: IProductRepository,
        private readonly categoryService: CategoryService
    ) { }

    async create(createProductDto: CreateProductDto): Promise<ProductResponseDto> {
        await this.categoryService.findById(createProductDto.categoryId);

        const product = await this.productRepository.create(createProductDto);
        return this.toResponseDto(product);
    }

    async findAll(filters?: GetProductsFilterDto): Promise<ProductResponseDto[]> {
        const products = await this.productRepository.findAll(filters);
        return products.map(product => this.toResponseDto(product));
    }

    async findById(id: string): Promise<ProductResponseDto> {
        const product = await this.productRepository.findById(id);
        if (!product) {
            throw new NotFoundException(`No se encontró el producto con ID: ${id}`);
        }
        return this.toResponseDto(product);
    }

    async update(id: string, updateProductDto: UpdateProductDto): Promise<ProductResponseDto> {
        await this.findById(id);

        if (updateProductDto.categoryId) {
            await this.categoryService.findById(updateProductDto.categoryId);
        }

        const updatedProduct = await this.productRepository.update(id, updateProductDto);
        return this.toResponseDto(updatedProduct);
    }

    async delete(id: string): Promise<void> {
        await this.findById(id);
        await this.productRepository.delete(id);
    }

    private toResponseDto(product: any): ProductResponseDto {
        return {
            id: product.id,
            name: product.name,
            category: product.category,
            price: product.price,
            currency: product.currency,
            image: product.image,
            bestseller: product.bestseller,
            featured: product.featured,
            description: product.description,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        };
    }
}