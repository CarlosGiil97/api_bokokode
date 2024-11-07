import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../../application/dtos/create-product.dto';
import { UpdateProductDto } from '../../application/dtos/update-product.dto';
import { GetProductsFilterDto } from '../../application/dtos/get-products-filter.dto';

export interface IProductRepository {
    findAll(filters?: GetProductsFilterDto): Promise<Product[]>;
    findById(id: string): Promise<Product | null>;
    create(product: CreateProductDto): Promise<Product>;
    update(id: string, product: UpdateProductDto): Promise<Product>;
    delete(id: string): Promise<void>;
}