import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SecaoDTO } from './secao.dto';

@Injectable()
export class SecaoService {
    constructor(private prisma: PrismaService){}


    async create(data: SecaoDTO){
        const res = await this.prisma.secao.create({
            data: {...data}
        })

        return res
    }

    async list(){
        const res = await this.prisma.secao.findMany()

        return res
    }

    async listId(name: string){
        const res = await this.prisma.secao.findMany({

            where: {
                name: name
            }
        })

        return res
    }
}
