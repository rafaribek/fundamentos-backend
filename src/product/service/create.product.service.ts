import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "../repository/products.repository";
import { Category } from "@prisma/client";

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
interface CreateProductServiceRequest{
      name: string;
      description?: string;
      price: number;
      inStock: number;
      isAvailable: boolean;
      category: Category;
      tags: string[];
}

type CreateProductServiceResponse = {
    product: Product;
    
}

@Injectable()
export class CreateProductService {
    constructor (private productRepository: ProductsRepository){}

        async execute({
            
            name,
            description,
            price,
            inStock,
            isAvailable,
            category,
            tags,

        }:CreateProductServiceRequest):Promise<CreateProductServiceResponse>{
            const productWithSameName = await this.productRepository.findByName(name);

            if (productWithSameName) {
                throw new Error("Product already exists");
            }

            const product = {
                name,
                description,
                price,
                inStock,
                isAvailable,
                category,
                tags,
            };
            

            const newProduct = await this.productRepository.create(product);

            return{
                product: {
                    id: newProduct.id?.toString() || "",
                    name,
                    description,
                    price,
                    inStock,
                    isAvailable,
                    category,
                    tags,
                    createdAt: newProduct.createdAt,
                    updatedAt: newProduct.updatedAt,
                }
        };
    }
}