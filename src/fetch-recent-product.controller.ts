import { Controller, Get } from '@nestjs/common';
import { FetchRecentProductService } from './fetch-recent-product.service';


@Controller('/products')
export class FetchRecentsProductsController {
  constructor(private fetchRecents: FetchRecentProductService) {}

  @Get('/recents')
  async handle() {
    const products = await this.fetchRecents.execute();
    return { products };
  }
}

