import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {  Repository } from "typeorm";
import { CustomAttribute } from "./customAttribute.entity";
import { CustomAttributeDto } from "./dto/CustomAttributeDto";
import { CustomAttributePageDto } from "./dto/CustomAttributePageDto";
import { CustomAttributePageOptionsDto } from "./dto/CustomAttributePageOptionDto";




@Injectable()
export class CustomAttributeService{
    constructor(
        @InjectRepository(CustomAttribute)
        private readonly CustomAttributeRepository: Repository<CustomAttribute>,
    ){}

    async findOne(id: string){
        return this.CustomAttributeRepository.findOne({id});
    }

    async findOneOrFail(id: string){
        return this.CustomAttributeRepository.findOneOrFail({id});
    }

    async addCustomAttribute(custom_attribute: CustomAttributeDto){
        return this.CustomAttributeRepository.save(custom_attribute);
    }

    async getCustomAttribute(
        custom_attributeOptionsDto: CustomAttributePageOptionsDto,
    ): Promise<CustomAttributePageDto> {
        const queryBuilder = this.CustomAttributeRepository.createQueryBuilder('CustomAttribute')
        const [customAttribute, pageMetaDto] = await queryBuilder.paginate(
            custom_attributeOptionsDto,
        );

        return new CustomAttributePageDto(customAttribute, pageMetaDto);
    }


}