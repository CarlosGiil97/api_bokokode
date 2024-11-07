import { ApiProperty } from '@nestjs/swagger';

export class CategoryResponseDto {
    @ApiProperty({
        description: 'ID único de la categoría',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    id!: string;

    @ApiProperty({
        description: 'Nombre de la categoría',
        example: 'Electronics'
    })
    name!: string;

    @ApiProperty({
        description: 'Descripción de la categoría',
        example: 'Productos electrónicos y accesorios'
    })
    description?: string;

    @ApiProperty({
        description: 'Fecha de creación',
        example: '2024-01-01T00:00:00Z'
    })
    createdAt!: Date;

    @ApiProperty({
        description: 'Fecha de última actualización',
        example: '2024-01-01T00:00:00Z'
    })
    updatedAt!: Date;
}