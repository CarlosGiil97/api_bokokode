import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    HttpStatus,
    HttpCode
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CategoryService } from '../../application/services/category.service';
import { CreateCategoryDto } from '../../application/dtos/create-category.dto';
import { UpdateCategoryDto } from '../../application/dtos/update-category.dto';
import { CategoryResponseDto } from '../../application/dtos/category-response.dto';

@ApiTags('Categorías')
@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Post()
    @ApiOperation({ summary: 'Crear una nueva categoría' })
    @ApiResponse({
        status: 201,
        description: 'La categoría ha sido creada exitosamente',
        type: CategoryResponseDto
    })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @ApiResponse({ status: 409, description: 'La categoría ya existe' })
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createCategoryDto: CreateCategoryDto): Promise<CategoryResponseDto> {
        return this.categoryService.create(createCategoryDto);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todas las categorías' })
    @ApiResponse({
        status: 200,
        description: 'Lista de categorías obtenida exitosamente',
        type: [CategoryResponseDto]
    })
    async findAll(): Promise<CategoryResponseDto[]> {
        return this.categoryService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener una categoría por ID' })
    @ApiResponse({
        status: 200,
        description: 'Categoría encontrada exitosamente',
        type: CategoryResponseDto
    })
    @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
    async findById(@Param('id') id: string): Promise<CategoryResponseDto> {
        return this.categoryService.findById(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar una categoría' })
    @ApiResponse({
        status: 200,
        description: 'Categoría actualizada exitosamente',
        type: CategoryResponseDto
    })
    @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
    @ApiResponse({ status: 409, description: 'El nombre de la categoría ya existe' })
    async update(
        @Param('id') id: string,
        @Body() updateCategoryDto: UpdateCategoryDto
    ): Promise<CategoryResponseDto> {
        return this.categoryService.update(id, updateCategoryDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar una categoría' })
    @ApiResponse({ status: 204, description: 'Categoría eliminada exitosamente' })
    @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') id: string): Promise<void> {
        await this.categoryService.delete(id);
    }
}