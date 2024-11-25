import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { EquipeDTO } from './dto/equipe.dto';

@Injectable()
export class EquipeService {
    constructor(private prisma:PrismaService){}


    async create(data: EquipeDTO){
        const res = await this.prisma.team.create({
            data: {...data}
        })

        return res;
    }

    async getEquipes(){
        return await this.prisma.team.findMany();
    }

    
}
