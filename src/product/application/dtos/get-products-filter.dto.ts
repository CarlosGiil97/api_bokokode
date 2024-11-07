import { IsOptional, IsArray, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum SortType {
    ASC = 'ASC',
    DESC = 'DESC'
}

export class GetProductsFilterDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsArray()
    categories?: string[];

    @ApiProperty({ required: false })
    @IsOptional()
    sort?: {
    @IsString()
    key: 'price' | 'name';

    @IsEnum(SortType)
    type: SortType;
};
}