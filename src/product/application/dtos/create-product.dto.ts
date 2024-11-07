import { IsNotEmpty, IsString, IsNumber, IsUrl, IsBoolean, IsOptional, MaxLength, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProductImageDto {
    @ApiProperty({
        description: 'URL de la imagen del producto',
        example: 'https://technical-frontend-api.bokokode.com/img/Product_Featured_product.png'
    })
    @IsNotEmpty()
    @IsUrl()
    src!: string;

    @ApiProperty({
        description: 'Texto alternativo de la imagen',
        example: 'Descripción de la imagen del producto'
    })
    @IsNotEmpty()
    @IsString()
    alt!: string;
}

export class CreateProductDto {
    @ApiProperty({
        description: 'Nombre del producto',
        example: 'Illo dolor quos aut voluptatem qui consequatur sit.'
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    name!: string;

    @ApiProperty({
        description: 'ID de la categoría',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsNotEmpty()
    @IsUUID('4')
    categoryId!: string;

    @ApiProperty({
        description: 'Precio del producto',
        example: 261
    })
    @IsNumber()
    price!: number;

    @ApiProperty({
        description: 'Moneda del precio',
        example: 'EUR',
        default: 'EUR'
    })
    @IsOptional()
    @IsString()
    currency: string = 'EUR';

    @ApiProperty({
        description: 'Información de la imagen del producto',
        type: ProductImageDto
    })
    @IsNotEmpty()
    image!: ProductImageDto;

    @ApiProperty({
        description: '¿Es un bestseller?',
        example: true,
        default: false
    })
    @IsOptional()
    @IsBoolean()
    bestseller: boolean = false;

    @ApiProperty({
        description: '¿Es un producto destacado?',
        example: true,
        default: false
    })
    @IsOptional()
    @IsBoolean()
    featured: boolean = false;

    @ApiProperty({
        description: 'Descripción del producto',
        example: 'Incidunt libero consequatur inventore voluptas neque dolor odit.',
        required: false
    })
    @IsOptional()
    @IsString()
    description?: string;
}