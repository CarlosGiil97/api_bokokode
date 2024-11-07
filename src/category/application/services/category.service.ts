import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ICategoryRepository } from '../../domain/repositories/category.repository.interface';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { CategoryResponseDto } from '../dtos/category-response.dto';
import { Category } from '../../domain/entities/category.entity';

@Injectable()
export class CategoryService {
    constructor(
        @Inject('ICategoryRepository')
        private readonly categoryRepository: ICategoryRepository
    ) { }

    async create(createCategoryDto: CreateCategoryDto): Promise<CategoryResponseDto> {
        const category = await this.categoryRepository.create(createCategoryDto);
        return this.toResponseDto(category);
    }

    async findAll(): Promise<CategoryResponseDto[]> {
        const categories = await this.categoryRepository.findAll();
        return categories.map(category => this.toResponseDto(category));
    }

    async findById(id: string): Promise<CategoryResponseDto> {
        const category = await this.categoryRepository.findById(id);
        if (!category) {
            throw new NotFoundException(`No se encontró la categoría con ID: ${id}`);
        }
        return this.toResponseDto(category);
    }

    async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<CategoryResponseDto> {
        await this.findById(id);
        const category = await this.categoryRepository.update(id, updateCategoryDto);
        return this.toResponseDto(category);
    }

    async delete(id: string): Promise<void> {
        await this.findById(id);
        await this.categoryRepository.delete(id);
    }

    private toResponseDto(category: Category): CategoryResponseDto {
        return {
            id: category.id,
            name: category.name,
            description: category.description,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt
        };
    }
}