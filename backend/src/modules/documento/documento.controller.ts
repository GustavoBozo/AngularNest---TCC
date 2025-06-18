import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
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
    @Body('idDono') idDono: string,
    @Body('idSec') idSec: string
  ) {
    const metadadosArray = JSON.parse(metadados);
    const teste = file.path
    return this.documentoService.uploadDocument(file,  metadadosArray, idDono, idSec);
  }

  @Post('filtrar')
  @UseInterceptors(FileInterceptor(''))
  async filtrar(
    @Body('metadados') metadados: string
  ) {

    const metadadosFiltro = JSON.parse(metadados);
    
    return this.documentoService.filtrar(metadadosFiltro);
  }

  @Get('list')
  async getaAll(){
    return this.documentoService.getAll()
  }

  @Get('list/:secName')
  async getSec(@Param('secName') sec: string){
    return this.documentoService.getSec(sec)
  }


  @Delete('delete/:id')
  delete(@Param('id') id: string):Promise<any>{
    return this.documentoService.delete(id)
  }

  
  @Get('inativo')
  async getIna(){
    return this.documentoService.getInatvios()
  }

  
  @Post('ativo/:id')
  ativar(@Param('id') id: string):Promise<any>{
    return this.documentoService.ativar(id)
  }

}



