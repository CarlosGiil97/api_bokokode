import { IsNotEmpty, IsString, IsNumber, IsUrl, IsBoolean, IsOptional, MaxLength, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class ProductImageDto {
    @ApiProperty({
        description: 'URL de la imagen del producto',
        example: 'https://technical-frontend-api.bokokode.com/img/Product_Featured_product.png'
    })
    @IsNotEmpty({ message: 'La URL de la imagen es requerida' })
    @IsUrl({}, { message: 'Debe ser una URL válida' })
    src: string;

    @ApiProperty({
        description: 'Texto alternativo de la imagen',
        example: 'Descripción de la imagen del producto'
    })
    @IsNotEmpty({ message: 'El texto alternativo es requerido' })
    @IsString({ message: 'El texto alternativo debe ser una cadena de texto' })
    alt: string;
}

export class CreateProductDto {
    @ApiProperty({
        description: 'Nombre del producto',
        example: 'Illo dolor quos aut voluptatem qui consequatur sit.'
    })
    @IsNotEmpty({ message: 'El nombre es requerido' })
    @IsString({ message: 'El nombre debe ser un texto' })
    @MaxLength(255, { message: 'El nombre no puede tener más de 255 caracteres' })
    name: string;

    @ApiProperty({
        description: 'ID de la categoría',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsNotEmpty({ message: 'El ID de la categoría es requerido' })
    @IsUUID('4', { message: 'El ID de la categoría debe ser un UUID válido' })
    categoryId: string;

    @ApiProperty({
        description: 'Precio del producto',
        example: 261
    })
    @IsNumber({}, { message: 'El precio debe ser un número' })
    price: number;

    @ApiProperty({
        description: 'Moneda del precio',
        example: 'EUR',
        default: 'EUR'
    })
    @IsOptional()
    @IsString({ message: 'La moneda debe ser un texto' })
    currency?: string = 'EUR';

    @ApiProperty({
        description: 'Información de la imagen del producto',
        type: ProductImageDto
    })
    @IsNotEmpty({ message: 'La información de la imagen es requerida' })
    image: ProductImageDto;

    @ApiProperty({
        description: '¿Es un bestseller?',
        example: true,
        default: false
    })
    @IsOptional()
    @IsBoolean({ message: 'bestseller debe ser un valor booleano' })
    bestseller?: boolean = false;

    @ApiProperty({
        description: '¿Es un producto destacado?',
        example: true,
        default: false
    })
    @IsOptional()
    @IsBoolean({ message: 'featured debe ser un valor booleano' })
    featured?: boolean = false;

    @ApiProperty({
        description: 'Descripción del producto',
        example: 'Incidunt libero consequatur inventore voluptas neque dolor odit.'
    })
    @IsOptional()
    @IsString({ message: 'La descripción debe ser un texto' })
    description?: string;
}