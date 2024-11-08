import { ApiProperty } from '@nestjs/swagger';
import { CategoryResponseDto } from '../../../category/application/dtos/category-response.dto';

class ImageResponseDto {
    @ApiProperty()
    src: string;

    @ApiProperty()
    alt: string;
}

export class ProductResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty({
        type: () => CategoryResponseDto
    })
    category: CategoryResponseDto;

    @ApiProperty()
    price: number;

    @ApiProperty()
    currency: string;

    @ApiProperty()
    image: ImageResponseDto;

    @ApiProperty()
    bestseller: boolean;

    @ApiProperty()
    featured: boolean;

    @ApiProperty()
    description: string;

    @ApiProperty()
    people_also_buy: ProductResponseDto[];

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}