import { Body, Controller, Get, Post } from '@nestjs/common';
import { EquipeService } from './equipe.service';
import { EquipeDTO } from './dto/equipe.dto';
import { Team } from '@prisma/client';
import { UsuarioService } from '../usuario/usuario.service';

@Controller('equipe')
export class EquipeController {
  constructor(private readonly equipeService: EquipeService,
    private readonly userService: UsuarioService,
  ){}

  

  @Post('create')
  create(@Body() body: EquipeDTO):Promise<Team>{
    return this.equipeService.create(body)
  }

  @Get('list')
  getEquipes(){
    return this.equipeService.getEquipes()
  }

  @Post('addEquipe')
  async addEquipe(@Body() email: string, name:string, teamId: string){
    
    const user = await this.userService.getUserEmail(email.toString())
    

    if(!user){
      await this.userService.create({email: email, name: name, password: `${name}2024`});
    }

    
    
    return this.equipeService.addMember(user.id, teamId)
  }
}
