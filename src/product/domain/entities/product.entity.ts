import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from '../../../category/domain/entities/category.entity';

interface ProductImage {
    src: string;
    alt: string;
}

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ name: 'category_id' })
    categoryId: string;

    @ManyToOne(() => Category, category => category.products)
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column({ type: 'varchar', length: 3, default: 'EUR' })
    currency: string;

    @Column({ type: 'simple-json' })
    image: ProductImage;

    @Column({ type: 'boolean', default: false })
    bestseller: boolean;

    @Column({ type: 'boolean', default: false })
    featured: boolean;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}