import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DocumentoService {
    constructor(private prisma:PrismaService){}



    async uploadDocument(file: Express.Multer.File, metadados: any[]){
        console.log(file, metadados)

        const dataDcoumento = {
            filename: file.originalname
        }
        
        const documentoNew = await this.prisma.document.create({
            data: dataDcoumento
        })

        await metadados.map(metadao => {
            this.prisma.documentMetadata.create({
                data: {
                    documentId: documentoNew.id,
                    metadataId: metadao.id
                }
            })
        })

        return {message: "Cadastrado com sucesso"}

        
    }

    async getAll(){
        return this.prisma.document.findMany()
    }
}
