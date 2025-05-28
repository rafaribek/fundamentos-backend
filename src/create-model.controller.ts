import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { z } from 'zod';
import { ZodValidationPipe } from './pipes/zod-validation-pipe';
import { isValidCPF } from "./app.controller";
import { CreateProductService } from "./create.product.service";
import { Category } from "@prisma/client";
import { CreateModelService } from "./create.model.service";

    const createModelBodySchema = z.object({
      name: z.string(),
    
    });

    const bodyValidationPipe = new ZodValidationPipe(createModelBodySchema);
    type createModelBodySchema = z.infer<typeof createModelBodySchema>;


    @Controller('/models')
    export class CreateModelController {
        constructor(private createModel: CreateModelService){}


    @Post()
      @HttpCode(201)
      async handle(@Body(bodyValidationPipe) body: createModelBodySchema){
        const{
          name,        

        } = body;


       const model =  await this.createModel.execute({  
          name,         

        })
        return {model}  
      }

    }