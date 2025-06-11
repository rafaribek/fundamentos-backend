import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "../repository/products.repository";
import { Category } from "@prisma/client";

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  inStock: number;
  isAvailable: Boolean;
  category: Category;
  tags: string[];
  createdAt: string | Date | undefined;
  updatedAt: string | Date | null | undefined;
}

interface EditProductServiceRequest {
  name: string;
  description?: string;
  price: number;
  inStock: number;
  isAvailable: boolean;
  category: Category;
  tags: string[];
  id: string;
}

type EditProductServiceResponse = {
  product: Product;
}

@Injectable()
export class EditProductService {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    name,
    description,
    price,
    inStock,
    isAvailable,
    category,
    tags,
    id,
  }: EditProductServiceRequest): Promise<EditProductServiceResponse> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new Error("Product not found");
    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.inStock = inStock;
    product.isAvailable = isAvailable;
    product.category = category;
    product.tags = tags;

    await this.productsRepository.save(product);

    const newProduct: Product = {
      id: product.id?.toString() || "",
      name: product.name,
      description: product.description as string,
      price: product.price,
      inStock: product.inStock,
      isAvailable: !!product.isAvailable,
      category: product.category,
      tags: product.tags as string[],
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };

    return {
      product: newProduct
    };
  }
}