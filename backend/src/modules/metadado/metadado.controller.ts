import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { MetadadoService } from './metadado.service';
import { MetadadoDTO } from './dto/metadado.dto';
import { Metadados } from '@prisma/client';

@Controller('metadado')
export class MetadadoController {
  constructor(private readonly metadadoService: MetadadoService) {}

  
  @Post('create')
  register(@Body() body: MetadadoDTO):Promise<Metadados>{
      return this.metadadoService.create(body)
  }

  

  @Get('list')
  getAll():Promise<any>{
    return this.metadadoService.getMetadado()
  }


  @Delete('delete/:id')
  delete(@Param('id') id: string):Promise<any>{
    return this.metadadoService.delete(id)
  }


}
