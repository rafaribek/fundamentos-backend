import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from './pipes/zod-validation-pipe';

const createProductBodySchema = z.object({
  name: z.string().min(3).max(20),
  model: z.string(),
  dateManufacture: z.string(),
  year: z.string(),
  brand: z.string(),
  email: z.string().email(),
  cpf: z.string().regex(new RegExp(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/),"CPF inválido")
})

const bodyValidationPipe = new ZodValidationPipe(createProductBodySchema);

type CreateProductBodySchema = z.infer<typeof createProductBodySchema>;

@Controller('/products')
export class AppController {
  constructor() {}

  @Post()
  create(@Body(bodyValidationPipe) body: CreateProductBodySchema): string {
    return "create";
  }   
}
