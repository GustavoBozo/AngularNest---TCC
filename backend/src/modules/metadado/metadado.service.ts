import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { MetadadoDTO } from './dto/metadado.dto';

@Injectable()
export class MetadadoService {
    constructor(private prisma:PrismaService){}


    async create(data: MetadadoDTO) {
        const metadado = await this.prisma.metadados.findFirst({
            where: {
                description: data.description
            }
        })

        if(metadado){
            throw new HttpException({message: 'Metadado já cadastrado'}, HttpStatus.BAD_REQUEST)
        }

        const res = await this.prisma.metadados.create({
            data: {...data}
        })

        return res
    }

    async getMetadado(){
        return await this.prisma.metadados.findMany()    
    }

    async delete(idD: string){
        return await this.prisma.metadados.delete({
            where: {
                id: idD
            }
        })
    }
}
