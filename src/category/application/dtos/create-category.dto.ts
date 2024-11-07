import { IsNotEmpty, IsString, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
    @ApiProperty({
        description: 'Nombre de la categoría',
        example: 'Electronics'
    })
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    @IsString()
    @MaxLength(100)
    name: string;

    @ApiProperty({
        description: 'Descripción de la categoría',
        example: 'Electronic devices and accessories',
        required: false
    })
    @IsOptional()
    @IsString()
    description?: string;
}