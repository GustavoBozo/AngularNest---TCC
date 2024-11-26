import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DocumentoService {
    constructor(private prisma:PrismaService){}



    async uploadDocument(file: Express.Multer.File, filename: string){
        const document = await this.prisma.document.create({
            data: {
              filename: file.filename,
              
            }
        });

        return document
    }
}
