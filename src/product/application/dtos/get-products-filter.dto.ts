import { IsOptional, IsArray, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum SortType {
    ASC = 'ASC',
    DESC = 'DESC'
}

export class SortOptions {
    @ApiProperty({
        description: 'Campo por el cual ordenar',
        enum: ['price', 'name'],
        example: 'price'
    })
    @IsString()
    key: 'price' | 'name';

    @ApiProperty({
        description: 'Tipo de ordenamiento',
        enum: SortType,
        example: SortType.ASC
    })
    @IsEnum(SortType)
    type: SortType;
}

export class GetProductsFilterDto {
    @ApiProperty({
        description: 'Categorías para filtrar',
        required: false,
        type: [String]
    })
    @IsOptional()
    @IsArray()
    categories?: string[];

    @ApiProperty({
        description: 'Opciones de ordenamiento',
        required: false,
        type: () => SortOptions
    })
    @IsOptional()
    sort?: SortOptions;
}