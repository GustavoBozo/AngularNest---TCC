import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { User } from '@prisma/client'
import { UserRegisterDTO } from './dto/user.dto';
import { loginDTO } from './dto/login.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post('create')
  register(@Body() body: UserRegisterDTO):Promise<User>{
      return this.usuarioService.create(body)
  }

  @Post('login')
  login(@Body() body: loginDTO):Promise<any>{
      return this.usuarioService.login(body)
  }

  @Get('list')
  getAll():Promise<any>{
    return this.usuarioService.getUser()
  }

  @Get("nomeUser")
  getNomeUser(){
    return this.usuarioService.getNomeCookie()
  }

  @Get("idUser")
  getEquipeUser(){
    return this.usuarioService.getIdCookie()
  }

  @Get('userList')
  getUsers(){
    return this.usuarioService.lisUser()
  }
}
