import { IsNotEmpty, IsString, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
    @ApiProperty({
        description: 'Nombre de la categoría',
        example: 'Electronics'
    })
    @IsNotEmpty({ message: 'El nombre es requerido' })
    @IsString({ message: 'El nombre debe ser un texto' })
    @MaxLength(100, { message: 'El nombre no puede tener más de 100 caracteres' })
    name!: string;

    @ApiProperty({
        description: 'Descripción de la categoría',
        example: 'Productos electrónicos y accesorios',
        required: false
    })
    @IsOptional()
    @IsString({ message: 'La descripción debe ser un texto' })
    description?: string;
}