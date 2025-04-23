import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DocumentoService {
    constructor(private prisma:PrismaService){}



    async uploadDocument(file: Express.Multer.File, metadados: any[]){
        console.log(file, metadados)

        
    }
}
