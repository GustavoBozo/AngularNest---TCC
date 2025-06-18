
import { SecaoService } from './secao.service';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SecaoDTO } from './secao.dto';

@Controller('secao')
export class SecaoController {
  constructor(private readonly secaoService: SecaoService) {}


  @Post('create')
  register(@Body() body: SecaoDTO):Promise<any>{
      return this.secaoService.create(body)
  }

  @Get("list")
  getAll(){
    return this.secaoService.list()
  }

  @Get("list/:secName")
  getId(@Param('secName') name: string){
    return this.secaoService.listId(name)
  }



  


}
