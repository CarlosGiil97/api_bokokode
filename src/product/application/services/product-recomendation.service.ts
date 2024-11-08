import { Injectable } from '@nestjs/common';
import { ProductResponseDto } from '../dtos/product-response.dto';

@Injectable()
export class ProductRecommendationService {
    private getRandomProducts(products: ProductResponseDto[], count: number): ProductResponseDto[] {
        const shuffled = [...products].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    public enrichWithRecommendations(
        product: ProductResponseDto,
        allProducts: ProductResponseDto[]
    ): ProductResponseDto {
        const otherProducts = allProducts.filter(p => p.id !== product.id);

        const sameCategory = otherProducts.filter(
            p => p.category === product.category,
        );

        let recommendations: ProductResponseDto[] = [];

        if (sameCategory.length >= 3) {
            recommendations = this.getRandomProducts(sameCategory, 3);
        } else {
            recommendations = [...sameCategory];
            const otherCategories = otherProducts.filter(
                p => p.category !== product.category,
            );
            const remainingCount = 3 - recommendations.length;
            const additionalRecommendations = this.getRandomProducts(
                otherCategories,
                remainingCount,
            );
            recommendations = [...recommendations, ...additionalRecommendations];
        }

        return {
            ...product,
            people_also_buy: recommendations.map(rec => ({
                ...rec,
                people_also_buy: []
            }))
        };
    }

    public async enrichMultipleWithRecommendations(
        products: ProductResponseDto[],
        allProducts: ProductResponseDto[]
    ): Promise<ProductResponseDto[]> {
        return products.map(product =>
            this.enrichWithRecommendations(product, allProducts)
        );
    }
}