import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../../domain/entities/category.entity';
import { ICategoryRepository } from '../../domain/repositories/category.repository.interface';
import { CreateCategoryDto } from '../../application/dtos/create-category.dto';
import { UpdateCategoryDto } from '../../application/dtos/update-category.dto';

@Injectable()
export class CategoryRepository implements ICategoryRepository {
    constructor(
        @InjectRepository(Category)
        private readonly repository: Repository<Category>,
    ) { }

    async findAll(): Promise<Category[]> {
        return this.repository.find({ where: { isActive: true } });
    }

    async findById(id: string): Promise<Category | null> {
        return this.repository.findOne({ where: { id, isActive: true } });
    }

    async findByName(name: string): Promise<Category | null> {
        return this.repository.findOne({ where: { name, isActive: true } });
    }

    async create(categoryDto: CreateCategoryDto): Promise<Category> {
        const category = this.repository.create(categoryDto);
        return this.repository.save(category);
    }

    async update(id: string, categoryDto: UpdateCategoryDto): Promise<Category> {
        await this.repository.update(id, categoryDto);
        return this.findById(id);
    }

    async delete(id: string): Promise<void> {
        await this.repository.update(id, { isActive: false });
    }
}