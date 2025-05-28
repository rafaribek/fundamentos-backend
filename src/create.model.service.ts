import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { Category } from "@prisma/client";
import { ModelsRepository } from "./models.repository";

export interface Model {
    id: string;
    name: string;
    createdAt: string | Date | undefined;
    updatedAt: string | Date | undefined | null;
}
interface CreateModelServiceRequest{
      name: string;
}

type CreateModelServiceResponse = {
    model: Model;
    
}

@Injectable()
export class CreateModelService {
    constructor (private modelsRepository: ModelsRepository){}

        async execute({
            
            name

        }:CreateModelServiceRequest):Promise<CreateModelServiceResponse>{
            const modelWithSameName = await this.modelsRepository.findByName(name);

            if (modelWithSameName) {
                throw new Error("Product already exists");
            }

            const model = {
                name,            
            };
            

            const newModel = await this.modelsRepository.create(model);

            return{
                model: {
                    id: newModel.id?.toString() || "",
                    name,
                    createdAt: newModel.createdAt,
                    updatedAt: newModel.updatedAt,
                }
        };
    }
}