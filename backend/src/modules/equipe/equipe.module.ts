import { Module } from '@nestjs/common';
import { EquipeService } from './equipe.service';
import { EquipeController } from './equipe.controller';
import { PrismaService } from 'src/prisma.service';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [EquipeController],
  providers: [EquipeService, PrismaService, UsuarioService, JwtService],
})
export class EquipeModule {}
