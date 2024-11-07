import { Category } from '../../category/domain/entities/category.entity';
import { Product } from '../../product/domain/entities/product.entity';
import { DataSource } from 'typeorm';

export class PoblarDbSeed {
    constructor(private dataSource: DataSource) { }

    async run() {
        const categories = await this.dataSource
            .getRepository(Category)
            .save([
                {
                    name: 'people',
                    description: 'Productos relacionados con personas',
                    popularity: 1
                },
                {
                    name: 'premium',
                    description: 'Productos premium',
                    popularity: 2
                },
                {
                    name: 'pets',
                    description: 'Productos para mascotas',
                    popularity: 3
                },
                {
                    name: 'food',
                    description: 'Productos alimenticios',
                    popularity: 4
                },
                {
                    name: 'landmarks',
                    description: 'Lugares emblemáticos',
                    popularity: 5
                }
            ]);

        // Crear productos
        await this.dataSource.getRepository(Product).save([
            {
                name: 'Producto Premium 1',
                categoryId: categories[1].id,
                price: 261,
                currency: 'EUR',
                image: {
                    src: 'https://technical-frontend-api.bokokode.com/img/Product_Featured_product.png',
                    alt: 'Producto Premium 1'
                },
                bestseller: true,
                featured: true,
                description: 'Descripción del producto premium 1'
            },
            {
                name: 'Producto People 1',
                categoryId: categories[0].id,
                price: 150,
                currency: 'EUR',
                image: {
                    src: 'https://technical-frontend-api.bokokode.com/img/Product_Featured_product.png',
                    alt: 'Producto People 1'
                },
                bestseller: false,
                featured: false,
                description: 'Descripción del producto people 1'
            }
        ]);

        console.log('Seed ejecutado correctamente');
    }
}