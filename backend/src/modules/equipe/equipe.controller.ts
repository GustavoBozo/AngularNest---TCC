import { Body, Controller, Get, Post } from '@nestjs/common';
import { EquipeService } from './equipe.service';
import { EquipeDTO } from './dto/equipe.dto';
import { Team } from '@prisma/client';

@Controller('equipe')
export class EquipeController {
  constructor(private readonly equipeService: EquipeService) {}

  @Post('create')
  create(@Body() body: EquipeDTO):Promise<Team>{
    return this.equipeService.create(body)
  }

  @Get('list')
  getEquipes(){
    return this.equipeService.getEquipes()
  }


}
