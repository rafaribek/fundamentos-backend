import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class GetProductByIdService {
  async execute(id: string): Promise<any> {
    const productExists = true;

    if (!productExists) {
      throw new NotFoundException('Product not found');
    }

    const product = {
      id,
      name: 'Sample Product',
      price: 100,
      description: 'This is a sample product',
    };

    return product;
  }
}