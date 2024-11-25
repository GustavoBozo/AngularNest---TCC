import { Module } from '@nestjs/common';
import { DocumentoService } from './documento.service';
import { DocumentoController } from './documento.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [DocumentoController],
  providers: [DocumentoService, PrismaService],
})
export class DocumentoModule {}
