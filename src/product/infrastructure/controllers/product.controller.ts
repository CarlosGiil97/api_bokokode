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
import { ProductService } from '../../application/services/product.service';
import { CreateProductDto } from '../../application/dtos/create-product.dto';
import { UpdateProductDto } from '../../application/dtos/update-product.dto';
import { ProductResponseDto } from '../../application/dtos/product-response.dto';
import { GetProductsFilterDto } from '../../application/dtos/get-products-filter.dto';

@ApiTags('Productos')
@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo producto' })
    @ApiResponse({
        status: 201,
        description: 'El producto ha sido creado exitosamente',
        type: ProductResponseDto
    })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createProductDto: CreateProductDto): Promise<ProductResponseDto> {
        return this.productService.create(createProductDto);
    }

    @Post('filter')
    @ApiOperation({ summary: 'Obtener productos con filtros' })
    @ApiResponse({
        status: 200,
        description: 'Lista de productos filtrada obtenida exitosamente',
        type: [ProductResponseDto]
    })
    async findAllWithFilters(@Body() filters: GetProductsFilterDto): Promise<ProductResponseDto[]> {
        return this.productService.findAll(filters);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los productos' })
    @ApiResponse({
        status: 200,
        description: 'Lista de productos obtenida exitosamente',
        type: [ProductResponseDto]
    })
    async findAll(): Promise<ProductResponseDto[]> {
        return this.productService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un producto por ID' })
    @ApiResponse({
        status: 200,
        description: 'Producto encontrado exitosamente',
        type: ProductResponseDto
    })
    @ApiResponse({ status: 404, description: 'Producto no encontrado' })
    async findById(@Param('id') id: string): Promise<ProductResponseDto> {
        return this.productService.findById(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar un producto' })
    @ApiResponse({
        status: 200,
        description: 'Producto actualizado exitosamente',
        type: ProductResponseDto
    })
    @ApiResponse({ status: 404, description: 'Producto no encontrado' })
    async update(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto
    ): Promise<ProductResponseDto> {
        return this.productService.update(id, updateProductDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un producto' })
    @ApiResponse({ status: 204, description: 'Producto eliminado exitosamente' })
    @ApiResponse({ status: 404, description: 'Producto no encontrado' })
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') id: string): Promise<void> {
        await this.productService.delete(id);
    }
}