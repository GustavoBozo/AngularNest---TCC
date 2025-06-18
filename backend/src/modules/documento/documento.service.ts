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
                secId: sec.id
            }
            
            
            const documentoNew = await this.prisma.document.create({
                data: dataDcoumento
            })

            console.log('aqui')

            await metadados.map(async (metadao)  =>  {
                console.log("passou aqui")
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
        await this.prisma.documentMetadata.deleteMany({
            where: {
                documentId: id
            }
        });
 
        return await this.prisma.document.delete({
            where: {
                id: id
            },
             include: {
                documentMetadata: true 
            }
        })
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

    
}
