import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteProductService } from './delete-product.service';

@Controller('/products')
export class DeleteProductController {
  constructor(private deleteProductService: DeleteProductService) {}

  @Delete('/:id')
  async handle(@Param('id') id: string) {
    await this.deleteProductService.execute(id);
    return { message: 'Product deleted successfully' };
  }
}