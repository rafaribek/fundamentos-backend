import { Body, Controller, Param, Put } from "@nestjs/common";
import { UpdateAvailableProductService } from "./update-available-product.service";

@Controller('/products')
export class UpdateAvailableProductController {
  constructor(private updateAvailableService: UpdateAvailableProductService
  ) {}

  @Put('/:id/available')
  async handle(@Param('id') id: string, @Body('available') available: boolean) {
    const product = await this.updateAvailableService.execute(id, available);
    return { product };
  }
}