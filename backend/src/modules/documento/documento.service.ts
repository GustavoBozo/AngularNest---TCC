import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DocumentoService {
    constructor(private prisma:PrismaService){}



    async uploadDocument(file: Express.Multer.File, metadados: any[], idDono: string, idSec: string){
        
        
        const sec = await this.prisma.secao.findUnique({
            where: {
                id: idSec
            }
        })

        console.log(sec)
        try {

            const dataDcoumento = {
                filename: file.originalname,
                donoId: idDono,
                secId: sec.id,
                ativo: 1
            }
            
            
            const documentoNew = await this.prisma.document.create({
                data: dataDcoumento
            })

            

            await metadados.map(async (metadao)  =>  {
                
                const res = await this.prisma.documentMetadata.create({
                    data: {
                        documentId: documentoNew.id,
                        metadataId: metadao.id
                    }
                })

                return res
            })

            return {message: "Cadastrado com sucesso"}
        } catch (error) {
            console.log(error)
        }

        

        
    }

    async getAll(){
        return await this.prisma.document.findMany({
            include: {
            dono: {
                select: {
                id: true,
                name: true,
                email: true
                }
            },
            section: {
                select: {
                id: true,
                name: true
                }
            },
            documentMetadata: {
                include: {
                metadados: {
                    select: {
                    id: true,
                    description: true
                    }
                }
                }
            }
            },
            orderBy: {
            createdAt: 'desc'
            },
            where: {
                ativo: 1 
            }
        });
    }

    async getSec(getSec: string){
        const res = await this.prisma.secao.findMany({
            where: {
                name: getSec
            },
            
        })


        return this.prisma.document.findMany({
            where: {
                secId: res[0].id
            },
            include: {
                documentMetadata: {
                include: {
                metadados: {
                    select: {
                    id: true,
                    description: true
                    }
                }
                }
                
                },
            }
        })
    }


    async delete(id: string){
        return await this.prisma.document.update({
            where: {
                id: id
            },
            data: {
                ativo: 0
            }
        });
 
        
    }


    async filtrar(metadados: any[]){
        const ids = metadados.map(item => item.id);
        
         const resultado = await this.prisma.document.findMany({
            where: {
                documentMetadata: {
                    some: { 
                        metadataId: {
                            in: ids
                        }
                    }
                }
            },
            include: {
                documentMetadata: {
                    where: {
                        metadataId: {
                            in: ids
                        }
                    },
                    include: {
                        metadados: true 
                    }
                },
            }
        });
        
        console.log(resultado)
        return resultado
    }

    async getInatvios(){
        return await this.prisma.document.findMany({
            where: {
                ativo: 0
            }
        })
    }


    async ativar(idD: string){
        return await this.prisma.document.update({
            where: {
                id: idD
            },
            
            data: {
                ativo: 1
            }
        })
    }

    
}
