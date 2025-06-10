import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class DeleteProductService {
  async execute(id: string): Promise<void> {
    const productExists = true; 

    if (!productExists) {
      throw new NotFoundException('Product not found');
    }
  }
}