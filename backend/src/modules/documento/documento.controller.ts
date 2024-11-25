import { Controller } from '@nestjs/common';
import { DocumentoService } from './documento.service';

@Controller('documento')
export class DocumentoController {
  constructor(private readonly documentoService: DocumentoService) {}
}
