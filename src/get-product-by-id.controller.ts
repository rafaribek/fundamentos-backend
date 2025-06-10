import { Controller, Get, Param } from '@nestjs/common';
import { GetProductByIdService } from './get-product-by-id.service';

@Controller('/products')
export class GetProductByIdController {
  constructor(private getProductByIdService: GetProductByIdService) {}

  @Get('/:id')
  async handle(@Param('id') id: string) {
    const product = await this.getProductByIdService.execute(id);
    return { product };
  }
}