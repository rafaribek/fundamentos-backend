import { Controller, Patch, Param, Body } from '@nestjs/common';
import { EditProductService } from './edit-product.service';
import { z } from 'zod';
import { Category } from '@prisma/client';

const editProductBodySchema = z.object({
      name: z.string(),
      description: z.string().optional(),
      price: z.number(),
      inStock: z.number(),
      isAvailable: z.boolean(),
      category: z.enum([Category.ELETRONICS, Category.FOOD, Category.HOME, Category.OTHER]),
      tags: z.array(z.string()),
})
@Controller('/products')
export class EditProductController {
  constructor(private editProductService: EditProductService) {}

  @Patch('/:id')
  async handle(@Param('id') id: string, @Body() body: any) {
    const product = await this.editProductService.execute(id, body);
    return { product };
  }
}