import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EquipeService } from './equipe.service';
import { EquipeDTO } from './dto/equipe.dto';
import { Team } from '@prisma/client';
import { UsuarioService } from '../usuario/usuario.service';
import { UserRegisterDTO } from '../usuario/dto/user.dto';
import { identity } from 'rxjs';

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

  @Get('listEquipe/:userId')
  getEquipes1(@Param('userId') userId: string){
    return this.equipeService.getEquipesMe(userId)
  }

  @Post('addEquipe/:teamId/:userId')
  async addEquipe(@Body() data: UserRegisterDTO, @Param('teamId') teamId: string, @Param('userId') userId: string ){
    

    if(data.email){

      const user = await this.userService.getUserEmail(data.email.toString())
        if(!user){
          data.password = "2024";
          const newUser = await this.userService.create(data);
          return this.equipeService.addMember(newUser.id, teamId)
        }

        return this.equipeService.addMember(user.id, teamId)
    } 

    if(data.name){
      const user = await this.userService.getUserName(data.name.toString())
      if(!user){
        data.password = "2024";
        const newUser = await this.userService.create(data);
        return this.equipeService.addMember(newUser.id, teamId)
      }
      return this.equipeService.addMember(user.id, teamId)
    }

    if(userId){
      const user = await this.userService.getUserID(userId.toString())
      if(!user){
        data.password = "2024";
        const newUser = await this.userService.create(data);
        return this.equipeService.addMember(newUser.id, teamId)
      }

      return this.equipeService.addMember(user.id, teamId)
    }
    


    
    
    
  }

  @Post('addEquipe/:teamId')
  async addEquipe1(@Body() data: UserRegisterDTO, @Param('teamId') teamId: string){
    

    if(data.email){

      const user = await this.userService.getUserEmail(data.email.toString())
        if(!user){
          data.password = "2024";
          const newUser = await this.userService.create(data);
          return this.equipeService.addMember(newUser.id, teamId)
        }

        return this.equipeService.addMember(user.id, teamId)
    } 

    if(data.name){
      const user = await this.userService.getUserName(data.name.toString())
      if(!user){
        data.password = "2024";
        const newUser = await this.userService.create(data);
        return this.equipeService.addMember(newUser.id, teamId)
      }
      return this.equipeService.addMember(user.id, teamId)
    }

  }

  @Get('membro/:nome')
  delete(@Param('nome') nome: string):Promise<any>{
    return this.equipeService.getName(nome)
  }

}
