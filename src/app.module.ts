import { Module } from '@nestjs/common';
import { CreateProductController } from './create-product.controller';
import { CreateProductService } from './create.product.service';
import { PrismaService } from './prisma.service';
import { ProductsRepository } from './products.repository';
import { ModelsRepository } from './models.repository';
import { CreateModelService } from './create.model.service';
import { CreateModelController } from './create-model.controller';



@Module({
  imports: [],
  controllers: [CreateProductController, CreateModelController],
  providers: [PrismaService, CreateProductService, ProductsRepository, ModelsRepository, CreateModelService],
})
export class AppModule {}
