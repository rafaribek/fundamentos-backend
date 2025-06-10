import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Category } from '@prisma/client';
import { ProductsRepository } from './products.repository';

export interface Product {
    id: string;
    name: string;
    description?: string;
    price: number;
    inStock: number;
    isAvailable: boolean;
    category: Category;
    tags: string[];
    createdAt: string | Date | undefined;
    updatedAt: string | Date | undefined | null;
}

type CreateProductServiceResponse = {
    products: Product[];
};

@Injectable()
export class FetchRecentProductService {
    constructor(private productRepository: ProductsRepository) {}

    async execute(): Promise<CreateProductServiceResponse> {
        const products = await this.productRepository.findManyRecent();

        const newProducts: Product[] = [];

        if (products) {
            for (const product of products) {
                newProducts.push({
                    id: product.id?.toString() || '',
                    name: product.name,
                    description: product.description ?? '',
                    price: product.price,
                    inStock: product.inStock,
                    isAvailable: product.isAvailable ?? false,
                    category: product.category,
                    tags: product.tags ?? [],
                    createdAt: product.createdAt,
                    updatedAt: product.updatedAt,
                });
            }
        }

        return { products: newProducts };
    }
}