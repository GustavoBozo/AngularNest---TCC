import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { DocumentoService } from './documento.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

@Controller('documento')
export class DocumentoController {
  constructor(private readonly documentoService: DocumentoService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: path.resolve(__dirname, '..', '..', 'arquivos'),
      filename: (_req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
      },
    }),
    limits: { fileSize: 1024 * 1024 * 10 },
  }))
  async uploadDocument(
    @UploadedFile() file: Express.Multer.File,
    
  ) {
    return await this.documentoService.uploadDocument(file, file.filename);
  }
}



