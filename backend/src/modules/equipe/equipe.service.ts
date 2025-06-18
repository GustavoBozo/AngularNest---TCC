import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { EquipeDTO, EquipeDTO2 } from './dto/equipe.dto';
import { TeamMembership } from '@prisma/client';

@Injectable()
export class EquipeService {
    constructor(private prisma:PrismaService){}


    async create(data: EquipeDTO){
        const res = await this.prisma.team.create({
            data: data
        })

        return res;
    }

    async getEquipes(){
        return await this.prisma.team.findMany();
    }

    async getEquipesMe(userId: string): Promise<EquipeDTO2[]> {
        const a = this.prisma.teamMembership.findMany({
            where: {
                userId
            },
            include: {
                team: true,
            }
        });

        return a;
        
    }

    async addMember(userId: string, teamId: string){
        return this.prisma.teamMembership.create({
            data: {
                userId: userId,
                teamId: teamId
            }
        });
    }

    async getName(name: string) {
        return this.prisma.teamMembership.findMany({
            
            include: {
                team: true,
                user: true
            },
            where: {
                team: {
                    name: name
                }
            }
        })
    }

    
}
