import { IsOptional, IsString, IsNumber, IsUrl, IsBoolean, MaxLength, IsUUID } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

class UpdateProductImageDto {
    @ApiProperty({
        description: 'URL de la imagen del producto',
        example: 'https://technical-frontend-api.bokokode.com/img/Product_Featured_product.png',
        required: false
    })
    @IsOptional()
    @IsUrl({}, { message: 'Debe ser una URL válida' })
    src?: string;

    @ApiProperty({
        description: 'Texto alternativo de la imagen',
        example: 'Descripción de la imagen del producto',
        required: false
    })
    @IsOptional()
    @IsString({ message: 'El texto alternativo debe ser una cadena de texto' })
    alt?: string;
}

export class UpdateProductDto {
    @ApiProperty({
        description: 'Nombre del producto',
        example: 'Illo dolor quos aut voluptatem qui consequatur sit.',
        required: false
    })
    @IsOptional()
    @IsString({ message: 'El nombre debe ser un texto' })
    @MaxLength(255, { message: 'El nombre no puede tener más de 255 caracteres' })
    name?: string;

    @ApiProperty({
        description: 'ID de la categoría',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: false
    })
    @IsOptional()
    @IsUUID('4', { message: 'El ID de la categoría debe ser un UUID válido' })
    categoryId?: string;

    @ApiProperty({
        description: 'Precio del producto',
        example: 261,
        required: false
    })
    @IsOptional()
    @IsNumber({}, { message: 'El precio debe ser un número' })
    price?: number;

    @ApiProperty({
        description: 'Moneda del precio',
        example: 'EUR',
        required: false
    })
    @IsOptional()
    @IsString({ message: 'La moneda debe ser un texto' })
    currency?: string;

    @ApiProperty({
        description: 'Información de la imagen del producto',
        type: UpdateProductImageDto,
        required: false
    })
    @IsOptional()
    image?: UpdateProductImageDto;

    @ApiProperty({
        description: '¿Es un bestseller?',
        example: true,
        required: false
    })
    @IsOptional()
    @IsBoolean({ message: 'bestseller debe ser un valor booleano' })
    bestseller?: boolean;

    @ApiProperty({
        description: '¿Es un producto destacado?',
        example: true,
        required: false
    })
    @IsOptional()
    @IsBoolean({ message: 'featured debe ser un valor booleano' })
    featured?: boolean;

    @ApiProperty({
        description: 'Descripción del producto',
        example: 'Incidunt libero consequatur inventore voluptas neque dolor odit.',
        required: false
    })
    @IsOptional()
    @IsString({ message: 'La descripción debe ser un texto' })
    description?: string;
}