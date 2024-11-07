import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from '../../application/dtos/create-category.dto';
import { UpdateCategoryDto } from '../../application/dtos/update-category.dto';

export interface ICategoryRepository {
    findAll(): Promise<Category[]>;
    findById(id: string): Promise<Category | null>;
    findByName(name: string): Promise<Category | null>;
    create(category: CreateCategoryDto): Promise<Category>;
    update(id: string, category: UpdateCategoryDto): Promise<Category>;
    delete(id: string): Promise<void>;
}