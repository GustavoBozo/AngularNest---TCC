import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { DocumentoService } from './documento.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

@Controller('documento')
export class DocumentoController {
  constructor(private readonly documentoService: DocumentoService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocumento(
    @UploadedFile() file: Express.Multer.File,
    @Body('metadados') metadados: string,
  ) {
    const metadadosArray = JSON.parse(metadados);
    return this.documentoService.uploadDocument(file,  metadadosArray);
  }

  @Get('list')
  async getaAll(){
    return this.documentoService.getAll()
  }
}



