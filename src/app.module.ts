import { Module } from '@nestjs/common';
import { CreateProductController } from './product/controller/create-product.controller';
import { CreateProductService } from './product/service/create.product.service';
import { PrismaService } from './prisma.service';
import { ProductsRepository } from './product/repository/products.repository';
import { ModelsRepository } from './product/repository/models.repository';
import { CreateModelService } from './models/service/create.model.service';
import { CreateModelController } from './models/controller/create-model.controller';



@Module({
  imports: [],
  controllers: [CreateProductController, CreateModelController],
  providers: [PrismaService, CreateProductService, ProductsRepository, ModelsRepository, CreateModelService],
})
export class AppModule {}
