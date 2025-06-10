import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class EditProductService {
  async execute(id: string, data: any): Promise<any> {
    const productExists = true;

    if (!productExists) {
      throw new NotFoundException('Product not found');
    }

    const updatedProduct = {
      id,
      ...data,
    };

    return updatedProduct;
  }
}