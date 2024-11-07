import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { ICategoryRepository } from '../../domain/repositories/category.repository.interface';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { CategoryResponseDto } from '../dtos/category-response.dto';

@Injectable()
export class CategoryService {
    constructor(private readonly categoryRepository: ICategoryRepository) { }

    async create(createCategoryDto: CreateCategoryDto): Promise<CategoryResponseDto> {
        const existingCategory = await this.categoryRepository.findByName(createCategoryDto.name);
        if (existingCategory) {
            throw new ConflictException('El nombre de la categoría ya existe');
        }

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
            throw new NotFoundException(`Categoría con ${id} no encontrada`);
        }
        return this.toResponseDto(category);
    }

    async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<CategoryResponseDto> {
        const category = await this.categoryRepository.findById(id);
        if (!category) {
            throw new NotFoundException(`Categoría con ${id} no encontrada`);
        }

        if (updateCategoryDto.name) {
            const existingCategory = await this.categoryRepository.findByName(updateCategoryDto.name);
            if (existingCategory && existingCategory.id !== id) {
                throw new ConflictException('El nombre de la categoría ya existe');
            }
        }

        const updatedCategory = await this.categoryRepository.update(id, updateCategoryDto);
        return this.toResponseDto(updatedCategory);
    }

    async delete(id: string): Promise<void> {
        const category = await this.categoryRepository.findById(id);
        if (!category) {
            throw new NotFoundException(`Categoría con ${id} no encontrada`);
        }
        await this.categoryRepository.delete(id);
    }

    private toResponseDto(category: Category): CategoryResponseDto {
        return {
            id: category.id,
            name: category.name,
            description: category.description,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt,
        };
    }
}