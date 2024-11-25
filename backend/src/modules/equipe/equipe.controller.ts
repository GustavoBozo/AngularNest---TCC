import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { EquipeService } from './equipe.service';
import { EquipeDTO } from './dto/equipe.dto';
import { Team } from '@prisma/client';
import { UsuarioService } from '../usuario/usuario.service';

@Controller('equipe')
export class EquipeController {
  constructor(private readonly equipeService: EquipeService,
    private userService: UsuarioService
  ) {}

  @Post('create')
  create(@Body() body: EquipeDTO):Promise<Team>{
    return this.equipeService.create(body)
  }

  @Get('list')
  getEquipes(){
    return this.equipeService.getEquipes()
  }

  @Post('addEquipe')
  async addEquipe(@Body() email: string, nome:string, teamId: string){
    
    const user = await this.userService.getUserEmail(email)
    
    if(!user){
      throw new HttpException({message: "usuário não cadatrado"}, HttpStatus.BAD_REQUEST)
    }

    
    
    return this.equipeService.addMember(user.id, teamId)
  }
}
