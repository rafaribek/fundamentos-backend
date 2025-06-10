import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UpdateAvailableProductService {
  async execute(id: string, available: boolean): Promise<any> {
    const productExists = true;

    if (!productExists) {
      throw new NotFoundException('Product not found');
    }

    const updatedProduct = {
      id,
      available,
    };

    return updatedProduct;
  }
}